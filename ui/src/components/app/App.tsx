import React from "react";
import useGameState from "../../hooks/useGameState";
import { Hemisphere } from "../../types";
import World from "../world/World";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Container,
} from "@mui/material";
import { BugReport, Phishing, ViewCompact, Waves } from "@mui/icons-material";
import Calendar from "../calendar/Calendar";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import CreatureList from "../creatureList/CreatureList";
import Critterpedia from "../critterpedia/Critterpedia";

const drawerWidth = 240;

const App = () => {
  const gameState = useGameState();
  const location = useLocation();

  const isFilterable = ["/fish", "/insects", "/sea-creatures"].includes(
    location.pathname
  );

  const [filters, setFilters] = React.useState({
    hideDiscovered: false,
    hideUnavailable: false,
  });

  const setFilter = <K extends keyof typeof filters>(
    key: K,
    value: typeof filters[K]
  ) => setFilters((old) => ({ ...old, [key]: value }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <World />
          <Typography variant="h6" noWrap component="div">
            ACNH Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/fish">
                <ListItemIcon>
                  <Phishing />
                </ListItemIcon>
                <ListItemText primary={"Fish"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/insects">
                <ListItemIcon>
                  <BugReport />
                </ListItemIcon>
                <ListItemText primary={"Insects"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/sea-creatures">
                <ListItemIcon>
                  <Waves />
                </ListItemIcon>
                <ListItemText primary={"Sea Creatures"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/critterpedia">
                <ListItemIcon>
                  <ViewCompact />
                </ListItemIcon>
                <ListItemText primary={"Critterpedia"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hideDiscovered}
                    onChange={(event) =>
                      setFilter("hideDiscovered", event.target.checked)
                    }
                    disabled={!isFilterable}
                  />
                }
                label="Hide discovered"
              />
            </ListItem>
            <ListItem disablePadding>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hideUnavailable}
                    onChange={(event) =>
                      setFilter("hideUnavailable", event.target.checked)
                    }
                    disabled={!isFilterable}
                  />
                }
                label="Hide unavailable"
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Hemisphere
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Hemisphere"
                  value={gameState.hemisphere}
                  onChange={(event) =>
                    gameState.setHemisphere(event.target.value as Hemisphere)
                  }
                  disabled={!isFilterable}
                >
                  <MenuItem value="north">Northern Hemisphere</MenuItem>
                  <MenuItem value="south">Southern Hemisphere</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <Calendar
                onMonthClick={(month) => {
                  const now = new Date();
                  gameState.setTime(
                    new Date(`${now.getDate()} ${month} ${now.getFullYear()}`)
                  );
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Toolbar />
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/fish" replace={true} />} />
            <Route
              path="/fish"
              element={
                <CreatureList
                  category="fishes"
                  filters={filters}
                  title="Fish"
                />
              }
            />
            <Route
              path="/insects"
              element={
                <CreatureList
                  category="insects"
                  filters={filters}
                  title="Insects"
                />
              }
            />
            <Route
              path="/sea-creatures"
              element={
                <CreatureList
                  category="seaCreatures"
                  filters={filters}
                  title="Sea Creatures"
                />
              }
            />
            <Route path="/critterpedia" element={<Critterpedia />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
