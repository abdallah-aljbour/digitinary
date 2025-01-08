import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, TextField, Paper, Container } from "@mui/material";
import Icon from "../reusableComponent/lucideReact";
import Button from "../reusableComponent/button";

const HomePageMain = () => {
  const [userName, setUserName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = [
    {
      icon: <Icon name="Target" color="indigo" size={32} />,
      title: "Task Management",
      description: "Organize and track your tasks efficiently",
    },
    {
      icon: <Icon name="Rocket" color="purple" size={32} />,
      title: "Chat Application",
      description: "Real-time communication with team members",
    },
    {
      icon: <Icon name="Award" color="pink" size={32} />,
      title: "Axios Integration",
      description: "Seamless data handling and API integration",
    },
    {
      icon: <Icon name="Key" color="indigo" size={32} />,
      title: "Form",
      description: "You Must Input All Field",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Container maxWidth="lg">
        <Box className="py-16 flex flex-col items-center justify-center min-h-screen">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <Paper
                elevation={0}
                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
              >
                <Box className="text-center mb-8">
                  <Typography
                    variant="h3"
                    className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  >
                    Welcome
                  </Typography>
                  <Box className="flex justify-center mt-4">
                    <Icon name="Sparkles" color="yellow" size={24} />
                  </Box>
                </Box>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <TextField
                    label="What's your name?"
                    variant="outlined"
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/50"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(139, 92, 246, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(139, 92, 246, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(139, 92, 246, 1)",
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-indigo-600 font-bold px-6 py-4 rounded-xl border-2 border-indigo-600 shadow-md transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105"
                  >
                    Get Started
                  </Button>
                </form>
              </Paper>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Box className="text-center mb-16">
                <Typography
                  variant="h2"
                  className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
                >
                  Welcome, {userName}!
                </Typography>
                <Typography variant="h6" className="text-gray-600">
                  Explore our amazing features below
                </Typography>
              </Box>

              <Box className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      elevation={0}
                      className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <Box className="flex flex-col items-center text-center">
                        {feature.icon}
                        <Typography
                          variant="h6"
                          className="mt-4 mb-2 font-semibold"
                        >
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePageMain;
