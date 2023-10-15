import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function ClassCard({classTitle,classInstructors}) {
    return (
      <Card variant='outlined' sx={{
        display:'flex', 
        minWidth:180,
        borderRadius:'900px', 
        padding:'0.3rem',
        alignItems:'center',
        textAlign:'center',
        outlineWidth:'5px',
         }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom sx={{ typography: { md: 'h5', s: 'body1' } }} component="div">
              {classTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
             {classInstructors}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }