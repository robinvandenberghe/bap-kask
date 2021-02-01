import React, { useState, useEffect } from "react";
import { useNode, useEditor, Element } from '@craftjs/core';
import { Paper, Button as MaterialButton, Box, Typography, Grid, Chip, FormControl, FormLabel, Slider, FormControlLabel, Switch } from "@material-ui/core";
import ContentEditable from 'react-contenteditable'

export const Text = ({ text, fontSize, textAlign }) => {
  const { connectors: { connect, drag }, isActive, actions: { setProp }} = useNode((node) => ({
    isActive: node.events.selected
  }));
  const [editable, setEditable] = useState(false);
  useEffect(() => {!isActive && setEditable(false)}, [isActive]);

  return (
    <div
      ref={ref => connect(drag(ref))}
      onClick={e => setEditable(true)}
    >
      <ContentEditable
        disabled={!editable}
        html={text} 
        onChange={e => setProp(props => props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ``))} 
        tagName="p"
        style={{fontSize: `${fontSize}px`, textAlign}}
      />
    </div>
  );
};

const TextSettings = () => {
  const { actions: {setProp}, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(_, value) => {
            setProp(props => props.fontSize = value);
          }}
        />
      </FormControl>
    </>
  )
};

Text.craft = {
  props: {
    text: `Hi`,
    fontSize: 20
  },
  related: {
    settings: TextSettings
  }  
}

export const Button = ({size, variant, color, children}) => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <MaterialButton ref={ref => connect(drag(ref))} size={size} variant={variant} color={color}>
      {children}
    </MaterialButton>
  );
};

export const Container = ({background, padding = 0, children}) => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <Paper ref={ref => connect(drag(ref))} style={{margin: `5px 0`, background, padding: `${padding}px`}}>
      {children}
    </Paper>
  );
};

export const Card = ({background, padding = 20}) => {
  return (
    <Container background={background} padding={padding}>
      <div className="text-only">
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </div>
      <div className="buttons-only">
        <Button size="small" text="Learn more" variant="contained" color="primary" />
      </div>
    </Container>
  );
};

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <Box px={2} py={2}>
      <Grid container direction="column"  alignItems="center" justify="center" spacing={1}>
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Button text="Click me" size="small" />)} variant="contained">Button</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Text text="Hi world" />)} variant="contained">Text</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Element is={Container} padding={20} canvas />)} variant="contained">Container</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Card />)} variant="contained">Card</MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export const SettingsPanel = () => {  
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if ( currentNodeId ) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable()
      };
    }

    return {
      selected
    }
  });
  return  (    
    <Box bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs><Typography variant="subtitle1">Selected</Typography></Grid>
              <Grid item><Chip size="small" color="primary" label="Selected" /></Grid>
            </Grid>
          </Box>
        </Grid>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Prop</FormLabel>
          <Slider
            defaultValue={0}
            step={1}
            min={7}
            max={50}
            valueLabelDisplay="auto"
          />
        </FormControl>
        <MaterialButton
          variant="contained"
          color="default"
        >
          Delete
        </MaterialButton>
      </Grid>
      {
        selected.isDeletable ? (
          <MaterialButton
            variant="contained"
            color="default"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </MaterialButton>
        ) : null
        }
    </Box>
  );
};

export const Topbar = () => {
  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel
            control={<Switch checked={true} />}
            label="Enable"
          />
        </Grid>
        <Grid item>
          <MaterialButton size="small" variant="outlined" color="secondary">Serialize JSON to console</MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};