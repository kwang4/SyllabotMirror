import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function DiscordCard() {
    return (
      <Card variant='outlined' sx={{
        display: 'flex', 
        minWidth: 14/18,
        minHeight: 80,
        borderRadius: '90px', 
        padding: '0.3rem',
        alignItems: 'center',
        textAlign: 'center',
        outlineWidth: '5px',
        backgroundColor: 'white'
         }}>
        <CardActionArea>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia sx={{ height: 70, width: 70}} image="/slackicon.png"/>
            <Typography gutterBottom variant="h5" component="div" color="black" sx={{ ml: 2, flexGrow: 1 }}>
              Manage Slack Connection
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }