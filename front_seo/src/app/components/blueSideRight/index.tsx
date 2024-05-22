import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { LogoBoxStyle, LogoStyle, MainDivStyle } from "./style";
import { navItem } from "@/app/constant";
import "./style.scss"

function BlueSideLeft() {
  return (
    <div style={MainDivStyle}>
      <Box sx={LogoBoxStyle}>
        <img src="/assets/logo/WhiteLogoUnder.png" alt="Logo" style={LogoStyle} />
      </Box>
      <Grid container>
        <Grid xs={12} sx={{ textAlign: 'center' }}>
          Travaillez ensemble plus facilement
        </Grid>
        <Grid container xs={12} justifyContent="center" alignItems="center" sx={{ margin: '10px', marginTop: '60px' }}>
          {navItem(true).slice(1).map((item) => (
            <Grid xs={6} key={item.id} sx={{ textAlign: 'center' }}>
              <div style={{ padding: '12px 24px', gap: '10px' }}>
                {item.icon}
                <div>
                  {item.name}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default BlueSideLeft;
