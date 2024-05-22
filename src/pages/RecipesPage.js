import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const PORT = process.env.REACT_APP_PORT || 3001;

export default function RecipesPage() {
    const [blocks, setBlocks] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log('useEffect is running');
        fetchBlocksFromDatabase();
    }, []);

    const fetchBlocksFromDatabase = async () => {
        try {
            const response = await fetch(`http://localhost:${PORT}/getBlocks`);
            if (!response.ok) {
                console.log(`Failed to fetch blocks: ${response.status} ${response.statusText}`);
                return;
            }
            const data = await response.json();
            console.log('Data received from server:', data);
            setBlocks(data);
        } catch (error) {
            console.log(`An error occurred: ${error}`);
        }
    };

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

    const GenerateBlocks = () => {
        return (
            <>
                {blocks.map((block) => (
                    <Grid item xs={3} key={block.id}>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                padding: 3, 
                                borderRadius: 2, 
                                height: '100%', 
                                minHeight: '420px',
                                boxSizing: 'border-box', // Ensure padding is included in height
                                overflow: 'hidden'
                            }}
                        >
                            <Typography variant="h6">{block.title}</Typography>
                            <Typography>Amount: {block.amount}</Typography>
                            <Typography>Ingredients: {block.ingredient}</Typography>
                            <Typography>Description: {block.description}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </>
        );
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
            <Container sx={{minHeight: '100vh', }}>
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
                    <Grid item xs={3}>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                padding: 3, 
                                borderRadius: 2, 
                                height: '100%', 
                                minHeight: '200px',
                                boxSizing: 'border-box' // Ensure padding is included in height
                            }}
                        >
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
                    <GenerateBlocks />
                </Grid>
            </Container>
        </Box>
    );
}