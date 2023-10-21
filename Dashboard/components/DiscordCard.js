import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
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
        backgroundColor: '#7289d9'
      }}>
        <CardActionArea>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}> 
            <CardMedia sx={{ height: 75, width: 75 }} image="/discordicon.png"/>
            <Typography gutterBottom variant="h5" component="div" color="white" sx={{ ml: 2, flexGrow: 1 }}> 
              Manage Discord Connection
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}
