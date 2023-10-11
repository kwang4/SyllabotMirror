import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function OptionCard({optionTitle}) {
    return (
      <Card variant='outlined' sx={{
        display:'flex', 
        minWidth:180,
        minHeight:80,
        borderRadius:'90px', 
        padding:'0.3rem',
        alignItems:'center',
        textAlign:'center',
        outlineWidth:'5px'
         }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {optionTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }