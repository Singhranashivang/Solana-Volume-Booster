import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
                // Custom colors for the Solana DApp
                solana: {
                    dark: '#1A1F2C',
                    darker: '#151823',
                    darkest: '#0F1218',
                    purple: {
                        DEFAULT: '#9b87f5',
                        light: '#b3a4f7',
                        dark: '#7E69AB'
                    },
                    cyan: {
                        DEFAULT: '#1EAEDB',
                        light: '#33C3F0',
                        dark: '#0FA0CE'
                    },
                    green: {
                        DEFAULT: '#D946EF',
                        light: '#F2FCE2',
                        dark: '#6E59A5'
                    },
                    gray: {
                        DEFAULT: '#8E9196',
                        light: '#aaadb0',
                        dark: '#6c7075'
                    }
                },
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 15px 2px rgba(155, 135, 245, 0.4)'
                    },
                    '50%': {
                        boxShadow: '0 0 20px 5px rgba(155, 135, 245, 0.7)'
                    }
                },
                'text-glow': {
                    '0%, 100%': {
                        textShadow: '0 0 8px rgba(30, 174, 219, 0.6)'
                    },
                    '50%': {
                        textShadow: '0 0 12px rgba(30, 174, 219, 0.9)'
                    }
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'border-glow': {
                    '0%, 100%': {
                        borderColor: 'rgba(155, 135, 245, 0.7)'
                    },
                    '50%': {
                        borderColor: 'rgba(30, 174, 219, 0.9)'
                    }
                },
                'bounce-subtle': {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-3px)'
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'glow-pulse': 'glow-pulse 2s infinite',
                'text-glow': 'text-glow 2s infinite',
                'fade-in': 'fade-in 0.5s ease-in',
                'border-glow': 'border-glow 3s infinite',
                'bounce-subtle': 'bounce-subtle 2s infinite'
			},
            transitionProperty: {
                'glow': 'box-shadow, border-color',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
