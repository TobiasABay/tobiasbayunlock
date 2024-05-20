import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Navbar from './Navbar';

const PORT = process.env.REACT_APP_PORT || 3001;

export default function RecipesPage() {
    const [blocks, setBlocks] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [description, setDescription] = useState("");

    const addBlockToDatabase = async (title, amount, ingredient, description) => {
        try {
            const response = await fetch(`http://localhost:${PORT}/addBlocks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, amount, ingredient, description }),
            });

            if (!response.ok) {
                console.log(`Failed to add block: ${response.status} ${response.statusText}`);
                return null;
            }

            const data = await response.json();
            return data.id;
        } catch (error) {
            console.log(`An error occurred: ${error}`);
        }
    };

    const addBlock = async () => {
        const newBlock = { title, amount, ingredient, description };
        const id = await addBlockToDatabase(title, amount, ingredient, description);

        if (id != null) {
            newBlock.id = id;
            setBlocks([...blocks, newBlock]);
        }

        setTitle("");
        setAmount("");
        setIngredient("");
        setDescription("");
    };

    return (
        <Box sx={{ 
            backgroundColor: '#222', 
            minHeight: '100vh', 
            padding: 10, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
        }}>
            <Navbar />
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', backgroundColor: '#222' }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{ color: '#007bff', marginTop: 4 }}
                    >
                        Recipes
                    </Typography>
                    <Box sx={{ width: 16 }}></Box>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{ color: '#ffffff', marginTop: 4 }}
                    >
                        Page
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, borderRadius: 2 }}>
                            <TextField 
                                id="title" 
                                label="Title" 
                                variant="outlined" 
                                fullWidth 
                                margin="normal" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                            />
                            <TextField 
                                id="amount" 
                                label="Amount" 
                                variant="outlined" 
                                fullWidth 
                                margin="normal" 
                                value={amount} 
                                onChange={e => setAmount(e.target.value)} 
                            />
                            <TextField 
                                id="ingredients" 
                                label="Ingredients" 
                                variant="outlined" 
                                fullWidth 
                                margin="normal" 
                                value={ingredient} 
                                onChange={e => setIngredient(e.target.value)} 
                            />
                            <TextField 
                                id="description" 
                                label="Description" 
                                variant="outlined" 
                                fullWidth 
                                margin="normal" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                            />
                            <Button variant="contained" color="primary" sx={{ maxWidth: 200, margin: 1 }} onClick={addBlock}>Submit</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
