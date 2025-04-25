import React from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import children from './../assets/children.jpg'
import mom from './../assets/family.jpg'
import family from './../assets/NEW arrival.png'
import { useNavigate } from 'react-router';

export default function CatagorySection() {

    const navigate = useNavigate();

    return (
        <div>
            <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h1' align='left' color={'primary'}sx={{ /* fontFamily: 'Squada One', */ fontSize: { xs: '16px', md: '20px', lg: '24px' } }}>
                    Hena Catagories
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            </Box >

            <Grid container alignItems={'center'} spacing={1}>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} sx={{ mt: .5 }} onClick={()=> navigate('/babyAndKids')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: { xs: 100, sm: 150, md: 200, lg: 220, xl: 240 }, // responsive height
                                    objectFit: 'cover', // fills space and looks neat
                                    width: '100%'
                                }}
                                image={children}
                                alt="baby"
                            />
                            <CardContent sx={{
                                bgcolor: 'info.dark',
                                py: { xs: 1, sm: 1.5, md: 2 }, // responsive vertical padding
                                px: { xs: 1, sm: 2 },
                            }}>
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="div"
                                    sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' }, // responsive font
                                        fontWeight: 500,
                                    }}
                                >
                                    Baby&Kids
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} sx={{ mt: .5 }} onClick={()=> navigate('/familyAndMom')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: { xs: 100, sm: 150, md: 200, lg: 220, xl: 240 }, // responsive height
                                    objectFit: 'cover', // fills space and looks neat
                                    width: '100%'
                                }}
                                image={mom}
                                alt="mom"
                            />
                            <CardContent sx={{
                                bgcolor: 'info.dark',
                                py: { xs: 1, sm: 1.5, md: 2 }, // responsive vertical padding
                                px: { xs: 1, sm: 2 },
                            }}>
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="div"
                                    sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' }, // responsive font
                                        fontWeight: 500,
                                    }}
                                >
                                    Family&Mom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} sx={{ mt: .5 }} onClick={()=> navigate('/newArrival')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: { xs: 100, sm: 150, md: 200, lg: 220, xl: 240 }, // responsive height
                                    objectFit: 'cover', // fills space and looks neat
                                    width: '100%'
                                }}
                                image={family}
                                alt="new arrival"
                            />
                            <CardContent sx={{
                                bgcolor: 'info.dark',
                                py: { xs: 1, sm: 1.5, md: 2 }, // responsive vertical padding
                                px: { xs: 1, sm: 2 },
                            }}>
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="div"
                                    sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' }, // responsive font
                                        fontWeight: 500,
                                    }}
                                >
                                    New Arrival
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

            </Grid>

        </div>
    )
}
