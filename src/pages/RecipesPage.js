import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import Navbar from './Navbar';

export default function RecipesPage() {
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
                <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center', backgroundColor: '#222'}}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ color: '#007bff', marginTop: 4 }}
                >
                    Recipes
                </Typography>
                <Box sx={{width: 16}}></Box>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ color: '#ffffff', marginTop: 4 }}
                    >
                 Page
                </Typography>
                </Box>
                <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center', padding: 3, borderRadius: 2}}>
                    <TextField id="title" label="Title" variant="outlined" fullWidth margin="normal" />
                    <TextField id="amount" label="Amount" variant="outlined" fullWidth margin="normal" />
                    <TextField id="ingredients" label="Ingredients" variant="outlined" fullWidth margin="normal" />
                    <TextField id="description" label="Description" variant="outlined" fullWidth margin="normal" />
                    <TextField id="notes" label="Notes" variant="outlined" fullWidth margin="normal" />
                    <Button variant="contained" color="primary" sx={{maxWidth: 6, margin: 1}}>Submit</Button>
                </Paper>
            </Container>
        </Box>
    );
}
