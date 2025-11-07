import React, {useState, useEffect, useRef} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Text, OrbitControls } from '@react-three/drei'
import { User, Mail, Lock, Cpu, Shield, Zap, Orbit, FastForward, Check } from 'lucide-react'
import { gsap } from 'gsap'
import Terminal from '../common/Terminal'
import { authAPI } from '../../services/api'

const RotatingPyramids = () => {
    const pyramid1 = useRef();
    const pyramid2 = useRef();
    const pyramid3 = useRef();

    useFrame((state, delta) =>  {
        if (pyramid1.current) {
            pyramid1.current.rotation.y += delta * 0.8
            pyramid1.current.position.x = Math.sin(state.clock.elapsedTime) * 2
        }

        if (pyramid2.current) {
            pyramid2.current.rotation.x += delta * 0.6
            pyramid2.current.position.z = Math.sin(state.clock.elapsedTime) * 2
        }

        if (pyramid3.current) {
            pyramid3.current.rotation.z += delta * 0.7
            pyramid3.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 1
        }        
    })
    
    const Pyramid = ({ position, color, ref}) => (
        <mesh ref={ref} position={position}>
            <coneGeometry args={[0.8, 1.5, 4]}></coneGeometry>
            <meshBasicMaterial color={color} transparent opacity={0.4} wireframe></meshBasicMaterial>
        </mesh>
    );

    return (
        <group>
            <Pyramid ref={pyramid1} position={[-2, 0, 0]} color="#00ff00"></Pyramid>
            <Pyramid ref={pyramid2} position={[2, 0, 0]} color="#00bfff"></Pyramid>
            <Pyramid ref={pyramid3} position={[2, 0, -2]} color="#ff0000"></Pyramid>

            {/* <Text
                position={[0, 2.5, 0]}
                fontSize={0.25}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
                // font=''
            >
                CREATE ACCOUNT
            </Text> */}
        </group>
    )
}

const PasswordStrength = ({ password}) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++
        if (pass.match(/\d/)) strength++
        if (pass.match(/[^a-zA-Z\d]/)) strength++
        return strength;
    };

    const strength = getStrength(password);

    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColors = [
        'text-hacker-red',
        'text-hacker-hacker-red',
        'text-yellow-500',
        'text-hacker-blue',
        'text-hacker-green',
    ][strength];

    return (
        <div className="mt-2">
            <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4].map((index) => (
                    <div 
                        key={index}
                        className={`h-1 flex-1 rounded transition-all duration-500 ${
                            index <= strength ? strengthColors.replace('text', 'bg') : 'bg-gray-700' 
                        }`}
                    ></div>
                ))}
            </div>
            <p className={`text-xs font-mono ${strengthColors}`}>
                Password Strength: {strengthText}
            </p>
        </div>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // GSAP ANIMATIONS
        const tl = gsap.timeline();
        
        tl.fromTo('.register-container', 
            { opacity: 0, y: 50},
            {opacity: 1, y: 0, duration: 1, ease: 'power3.out'}
        )

        tl.fromTo('.form-field', 
            { opacity: 0, x: 50},
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'back.inOut(1.7)'},
            '-=0.5'
        )

        // Floating animation for features
        gsap.to('.feature-card', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.2
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Validation
        const newErrors = {};
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(true);
            const response = await authAPI.register(formData);

            const { user, refresh, access } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user', JSON.stringify(user));


            //Success animation
            gsap.to('.register-container', {
                y: -50,
                opacity: 0, 
                duration: 0.8,
                ease: 'power3.in',
                onComplete: () => {
                    navigate('/dashboard');
                }
            })
        } catch (error) {
            setErrors({ submit: 'Registration failed. Please try again.'});

            //Shake animation on error TODO

        } finally {
            setIsLoading(false);
        }
    }; 

    const handleChange = (e) => {
        const {name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : type === 'checkbox' ? checked : value ,
        }));

        //Clear field errors when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: ''}));
        }
    };

    const features = [
        { icon: Shield, text: 'Secure Data Encryption', color: 'text-hacker-green'},
        { icon: Zap, text: 'Advanced Analytics', color: 'text-hacker-blue'},
        { icon: Cpu, text: 'AI-Powered Insights', color: 'text-hacker-red'},
    ];

  return (
    <div className="min-h-screen bg-black/30 relative overflow-hidden">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0">
            <Canvas>
                <ambientLight intensity={0.5}></ambientLight>
                <pointLight position={[10, 10, 10]}></pointLight>
                <RotatingPyramids></RotatingPyramids>
                <OrbitControls enableZoom={false} enablePan={false}></OrbitControls>
            </Canvas>
        </div>

        {/* Main content */}
        <div className="realtive z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8}}
                animate={{ opacity: 1, scale: 1}}
                transition={{ duration: 0.8}}
                className='register-container w-full max-w-4xl'
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Features section */}
                    <div className="space-y-6">
                        <Terminal title="Why Join CyberFin?" icon={Cpu} className='h-full backdrop-blur-sm'>
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-hacker-green font-mono mb-4">
                                    Unlock Premium Features For Free
                                </h2>

                                {features.map((feature, index) => {
                                    const Icon = feature.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            className='feature-card fles items-center space-x-3 p-4 bg-black/30 border border-hacker-green/20 rounded-lg'
                                            whileHover={{ scale: 1.02}}
                                            transition={{ type: 'spring', stiffness: 300}}
                                        >
                                            <Icon className={feature.color} size={24}></Icon>
                                            <span className="text-white font-mono">{feature.text}</span>
                                        </motion.div>
                                    )
                                })}

                                <div className="mt-6 p-4 bg-hacker-blue/10 border border-hacker-blue/30 rounded-lg">
                                    <h3 className="font-bold text-hacker-blue font-mono mb-2">
                                        Getting Started
                                    </h3>
                                    <ul className="text-sm text-gray-300 font-mono space-y-1">
                                        <li>Track expenses witht smart categorizattion</li>
                                        <li>Manage tasks with priority system</li>
                                        <li>Access advanced financial analytics</li>
                                        <li>Join our ethical hacking community</li>
                                    </ul>
                                </div>
                            </div>
                        </Terminal>
                    </div>

                    {/* Registration Form */}
                    <Terminal title="Create Account" icon={User} className='backdrop-blur-md'>
                        <form key={formRef} onSubmit={handleSubmit} className='space-y-4'>
                            {/* Username */}
                            <div className="form-field">
                                <label className='form-label'>Username</label>
                                <div className="relative">
                                    <input
                                        type='text'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        className='form-input pl-10'
                                        placeholder='Enter your name'
                                        required
                                    ></input>
                                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green' size={18}></User>
                                </div>
                            </div>
                            
                            {/* Email */}
                            <div className="form-field">
                                <label className='form-label'>Email</label>
                                <div className="relative">
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='form-input pl-10'
                                        placeholder='Enter your email'
                                        required
                                    ></input>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green' size={18}></Mail>
                                </div>
                            </div>                        
                            
                            {/* Password */}
                            <div className="form-field">
                                <label className='form-label'>Password</label>
                                <div className="relative">
                                    <input
                                        type='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='form-input pl-10'
                                        placeholder='Create a strong password'
                                        required
                                    ></input>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green' size={18}></Lock>
                                </div>
                                <PasswordStrength password={formData.password}></PasswordStrength>
                            </div>
                            
                            {/* Confirm Password */}
                            <div className="form-field">
                                <label className='form-label'>Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type='password'
                                        name='confirmPassword'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className='form-input pl-10'
                                        placeholder='Confirm you password'
                                        required
                                    ></input>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green' size={18}></Lock>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-hacker-red text-xs font-mono mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Terms and Condition */}
                            <div className='form-field'>
                                <label className='flex items-start space-x-3 cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        name='acceptTerms'
                                        value={formData.acceptTerms}
                                        onChange={handleChange}
                                        className='w-4 h-4 mt-1 text-hacker-green bg-black border-hacker-green rounded focus:ring-hacker-green focus:ring-2'
                                    ></input>
                                    <span className="text-sm text-gray-400 font-mono flex-1">
                                        I agree to the {' '}
                                        <Link
                                            to='/terms'
                                            className='text-hacker-blue hover:text-hacker-green'
                                        >Terms and Conditions</Link> {' '}
                                        and {' '}
                                        <Link
                                            to='/privacy'
                                            className='text-hacker-blue hover:text-hacker-green'
                                        >Privacy Policy</Link>
                                    </span>
                                </label>
                                {errors.acceptTerms && (
                                    <p className="text-hacker-red font-mono text-xs mt-1">{errors.acceptTerms}</p>
                                )}
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                type='submit'
                                disabled={isLoading}
                                className='w-full bg-hacker-green text-black font-mono font-bold py-3 rounded-lg hover:bg-green-400 transition-all duration-300 transform hover:scale-1.05 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                            > 
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                        <span>CREATING ACCOUNT...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={18}></Check>
                                        <span>CREATE ACCOUNT</span>
                                    </>
                                )}
                            </button>

                            {/* Error Message */}
                            <AnimatePresence>
                                {errors.submit && ( 
                                    <motion.div
                                        initial={{ opacity: 0, y: -10}}
                                        animate={{ opacity: 1, y: 0}}
                                        exit={{ opacity: 0, y: -10}}
                                        className='p-3 bg-hacker-red/20 border-border-hacker-red rounded text-hacker-red font-mono text-sm text-center'
                                    >
                                        {errors.submit}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Login link */}
                            <div className="text-center pt-4 border-t border-gray-800">
                                <p className="text-gray-400 font-mono text-sm">
                                    Already have an account?{' '}
                                    <Link 
                                        to="/login"
                                        className='text-hacker-blue hover:text-hacker-green font-mono transition-colors'
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </Terminal>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default Register 