import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const PORT = process.env.REACT_APP_PORT || 3001;

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RecipesPage = () => {
    const [blocks, setBlocks] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
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
    /*
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
    */
    return (
        <Container >
            <Navbar></Navbar>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    backgroundColor: '#222', 
                    height: '100vh', 
                    overflow: 'hidden' 
                }}
            >
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
                <Box 
                    sx={{ 
                        flexGrow: 1, 
                        width: '100%', 
                        overflowY: 'auto', 
                        padding: 2,
                        marginTop: 2
                    }}
                >
                    <Grid container spacing={3}>
                        {blocks.map((block) => (
                            <Grid item xs={12} sm={6} md={4} key={block.id}>
                                <StyledPaper>
                                    <Typography variant="h6">{block.title}</Typography>
                                    <Typography>Amount: {block.amount}</Typography>
                                    <Typography>Ingredients: {block.ingredient}</Typography>
                                    <Typography>Description: {block.description}</Typography>
                                </StyledPaper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RecipesPage;
