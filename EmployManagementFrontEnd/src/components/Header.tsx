import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const DenseAppBar=() =>{
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box style={{ width: '100vw' }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div"sx={{ flexGrow: 1, textAlign: 'center' }}>
              Employ Details
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
export default DenseAppBar