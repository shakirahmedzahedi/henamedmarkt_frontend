import React from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import baby from './../assets/baby (1).jpeg'
import mom from './../assets/mom.jpg'
import family from './../assets/family.jpeg'
import newborn from './../assets/newborn.jpg'
import todler from './../assets/toddler.jpg'
import kids from './../assets/kids.jpg'
import { useNavigate } from 'react-router';


export default function AgeLimitSection() {

    const navigate = useNavigate();

    return (
        <div>
            <Box sx={{ textAlign: 'left' }}>
                <Typography variant='h1' align='left' color={'primary'} sx={{ /* fontFamily: 'Squada One', */ fontSize: { xs: '16px', md: '20px', lg: '24px' } }}>
                    Shop by Life’s Chapters
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            </Box >

            <Grid container alignItems={'center'} spacing={1}>

                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ mt: .5 }} onClick={() => navigate('/newBorn')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                /*  height="240"
                                 maxWidth="350" */
                                sx={{
                                    height: { xs: 100, sm: 150, md: 200, lg: 220, xl: 240 }, // responsive height
                                    objectFit: 'cover', // fills space and looks neat
                                    width: '100%'
                                }}
                                image={newborn}
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
                                    Newborns
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ mt: .5 }} onClick={() => navigate('/toddler')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: { xs: 100, sm: 150, md: 200, lg: 220, xl: 240 }, // responsive height
                                    objectFit: 'cover', // fills space and looks neat
                                    width: '100%'
                                }}
                                image={todler}
                                alt="mom"
                            />
                            <CardContent 
                            sx={{
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
                                    Toddlers
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ mt: .5}} onClick={() => navigate('/children')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: { xs: 100, sm: 150, md: 200, lg: 220, xl: 240 }, // responsive height
                                    objectFit: 'cover', // fills space and looks neat
                                    width: '100%'
                                }}
                                image={kids}
                                alt="new arrival"
                            />
                           <CardContent 
                           sx={{
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
                                    Children
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ mt: .5 }} onClick={() => navigate('/mom')}>
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
                                alt="new arrival"
                            />
                            <CardContent 
                            sx={{
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
                                    Mom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

            </Grid>

        </div>
    )
}
