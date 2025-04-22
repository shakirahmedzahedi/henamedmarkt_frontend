import React from 'react'
import { Box,Grid } from '@mui/material'
import Registration from '../features/auth/registration'
import logo from '../assets/logo.png'

const SignUpPage = () => {
  return (
    <div>
      <Box sx={{ minHeight: '65vh', ml: { sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 } }}>
      <Grid container alignItems={'center'} justifyContent={'center'} style={{ textAlign: 'center',marginTop:'50px'}}>
                <Grid item  md={5} lg={6} sx={{ textAlign: 'center', display:{xs:'none',lg:'block'}  }}
                >
                    <img
                        src={logo}
                        alt={logo}
                        style={{ width: '275px', height: '250px', marginTop:'30px' }}
 
                    />
                </Grid>
                <Grid item sm={12} md={10} lg={6} >
                    <Registration />

                </Grid>
            </Grid>
            </Box>
    </div>
  )
}

export default SignUpPage
