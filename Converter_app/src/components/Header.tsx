import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function ButtonAppBar() {
    return(
        <Box sx={{ flexGrow:1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        UNIT CONVERTER
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}