import React, { useState, useEffect, useRef} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link , useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, OrbitControls} from '@react-three/drei';
import { Eye, EyeOff, LogIn, Cpu, Shield, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import Terminal from '../common/Terminal';

const FloatingCubes = () => {
    const cube1 = useRef();
    const cube2 = useRef();
    const cube3 = useRef();

    useFrame((state, delta) => {
        if (cube1.current) {
            cube1.current.rotation.x += delta * 0.5
            cube1.current.rotation.y += delta * 0.3
            cube1.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
        }

        if (cube2.current) {
            cube2.current.rotation.x += delta * 0.5
            cube2.current.rotation.y += delta * 0.3
            cube2.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
        }

        if (cube3.current) {
            cube3.current.rotation.x += delta * 0.5
            cube3.current.rotation.y += delta * 0.3
            cube3.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3
        }        
    });

    return (
        <group>
            <Box ref={cube1} position={[-3, 0, 0]} args={[1, 1, 1]}>
                <meshBasicMaterial color="#00ff00" transparent opacity={0.1} wireframe></meshBasicMaterial>
            </Box>
            <Box ref={cube2} position={[3, 0, 0]} args={[0.8, 0.8, 0.8]}>
                <meshBasicMaterial color="#00bfff" transparent opacity={0.1} wireframe></meshBasicMaterial>
            </Box>
            <Box ref={cube3} position={[0, 0, -2]} args={[0.6, 0.6, 0.6]}>
                <meshBasicMaterial color="#ff0000" transparent opacity={0.1} wireframe></meshBasicMaterial>
            </Box>

            {/* <Text
                position={[0, 2, 0]}
                fontSize={0.3}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
                font=""
            >
                ACCESS SYSTEM
            </Text> */}
        </group>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Gsap Animation
        const tl = gsap.timeline();

        tl.fromTo('.login-container', 
            { opacity: 0, y: 50},
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out'}
        )

        tl.fromTo('.form-field', 
            { opacity: 0, x: -50},
            { opacity: 1, x: 0, duration: 0.8, ease: 'back.inOut(1.7)'},
            '-=0.5'
        )

        tl.fromTo('.security-feature', 
            { opacity: 0, scale: 0},
            { opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'elastic.out(1, 0.5)'},
            '-=0.3'
        )
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            //Animations on success
            gsap.to('.login-container', {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.in',
                onComplete: () => {
                    navigate('/dashboard');
                },
            })
        } catch (error) {
            setErrors({submit: 'Invalid credentials. Please try again.'});

            //Shake animation on error
            gsap.to(formRef.current,  {
                x: 10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: 'power1.inOut',
            })
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value,
        }));
        
        //Clear field errors when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: ''}));
        }
    };

  return (
    <div className="min-h-screen bg-black/30 relative overflow-hidden">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0">
            <Canvas>
                <ambientLight intensity={0.5}></ambientLight>
                <pointLight position={[10, 10, 10]}></pointLight>
                <FloatingCubes></FloatingCubes>
                <OrbitControls enableZoom={false} enablePan={false}></OrbitControls>
            </Canvas>
        </div>
        {/* Main  Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8}}
                animate={{ opacity: 1, scale: 1}}
                transition={{ duration: 0.8}}
                className='login-container w-full max-w-md'
            >
                <Terminal title="System Login" icon={Shield} className='backdrop-blur-sm'>
                    <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
                        {/* Header */}
                        <div className="test-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <Cpu className="text-hacker-green" size={32}></Cpu>
                                <h1 className="text-2xl font-bold text-hacker-green font-mono">
                                    CyberFin
                                </h1>
                            </div>
                            <p className="text-gray-400 font-mono text-sm">
                                Enter your credentials to access the system
                            </p>
                        </div>

                        {/* Username Field */}
                        <div className="form-field">
                            <label className='form-label'>
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`form-input pl-10 ${errors.username ? 'border-hacker-red' : ''}`}
                                    placeholder='Enter your username'
                                    required
                                ></input>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Zap size={18} className='text-hacker-green'></Zap>
                                </div>
                            </div>
                            {errors.username && (
                                <p className="text-hacker-red text-xs font-mono mt-1">{errors.username}</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div className="form-field">
                            <label className='form-label'>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={ showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`form-input pl-10 pr-10 ${errors.password ? 'border-hacker-red' : ''}`}
                                    placeholder='Enter your password'
                                    required
                                ></input>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Shield size={18} className='text-hacker-green'></Shield>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-hacker-green transition-colors'
                                >
                                    {showPassword ? <EyeOff size={18}></EyeOff> : <Eye size={18}></Eye>}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-hacker-red text-xs font-mono mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remembr me and forgot password */}
                        <div className="flex items-center justify-between">
                            <label className='flex items-center space-x-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    name='rememberMe'
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className='w-4 h-4 text-hacker-green bg-black border-hacker-green rounded focus:ring-hacker-green focus: ring-2'
                                ></input>
                                <span className="text-sm text-gray-400 font-mono">Remember Me</span>
                            </label>

                            <Link
                                to='/forgot-password'
                                className='text-sm text-hacker-blue hover:text-hacker-green font-mono transition-colors'
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-hacker-green text-black font-mono font-bold py-3 rounded-lg hover:bg-green-400 transition-all duration-300 transform hover:scale-1.05 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                    <span>AUTHENTICATING...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={18}></LogIn>
                                    <span>ACCESS SYSTEM</span>
                                </>
                            )}
                        </button>

                        {/* Error message */}
                        <AnimatePresence>
                            {errors.submit && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10}}
                                    animate={{ opacity: 1, y: 0}}
                                    exit={{ opacity: 0, y: -10}}
                                    className='p-3 bg-hacker-red/20 border border-hacker-red rounded text-hacker-red font-mono text-sm text-center'
                                >
                                    {errors.submit}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Register Link */}
                        <div className="text-center pt-4 border-t border-gray-800">
                            <p className="text-gray-400 font-mono text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className='text-hacker-blue hover:text-hacker-green font-mono transition-colors'
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </form>
                </Terminal>

                {/* Security features */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                        {icon: Shield, text: '256-bit Encryption', color: 'text-hacker-green'},
                        {icon: Zap, text: '2FA Ready', color: 'text-hacker-blue'},
                        {icon: Cpu, text: 'Secure Login', color: 'text-hacker-red'},
                    ].map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={index}
                                className='security-feature text-center p-3 bg-terminal-bg border border-hacker-green/20 rounded-lg'
                                whileHover={{ scale: 1.05}}
                                transition={{ type: 'spring', stiffness: 300}}
                            >
                                <Icon className={`${feature.color} mx-auto mb-2`} size={20}></Icon>
                                <p className="text-sm text-gray-400 font-mono">{feature.text}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default Login