import React, { useState, useContext } from 'react';
import { Grid, Slider, RadioGroup } from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import style from './Toolbar.module.css';
import { useNode } from '@craftjs/core';
import { ToolbarTextInput } from './ToolbarTextInput';
import { ToolbarDropdown } from './ToolbarDropdown';
import { withStyles } from '@material-ui/styles';
import { useObject } from '../../../hooks/useObject';
import { useStores } from '../../../hooks/useStores';
const iOSBoxShadow = `0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)`;

const SliderStyled = withStyles({
  root: {
    color: `#3880ff`,
    height: 2,
    padding: `5px 0`,
    width: `100%`,
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: `#fff`,
    boxShadow: iOSBoxShadow,
    marginTop: -7,
    marginLeft: -7,
    '&:focus,&:hover,&$active': {
      boxShadow:
        `0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)`,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: `calc(-50% + 11px)`,
    top: -22,
    '& *': {
      background: `transparent`,
      color: `#000`,
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: `#bfbfbf`,
  },
  mark: {
    backgroundColor: `#bfbfbf`,
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: `currentColor`,
  },
})(Slider);

export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }));
  const value = Array.isArray(propValue) ? propValue[index] : propValue;
  const [ error, setError ] = useState(``);
  const { object: obj } = useObject();
  const { projectStore } = useStores();
  const handleImageInput = async (e) => {
    const files = [...e.target.files];
    if(files.length > 0){
      try{
        const compressedFile = await imageCompression(files[0], {maxSizeMB: 2, maxWidthOrHeight: 1400});
        const r = await projectStore.uploadFile({data: {id: obj.id, previous: value } , file: compressedFile});
        setProp((props) => {
          if (Array.isArray(propValue)) {
            props[propKey][index] = onChange ? onChange(r.fileUrl) : r.fileUrl;
          } else {
            props[propKey] = onChange ? onChange(r.fileUrl) : r.fileUrl;
          }
        }, 500);
      } catch (error) {
        setError(error);
      }
    }
  }
  const handleAudioInput = async (e) => {
    const files = [...e.target.files];
    if(files.length > 0){
      try{
        if(files[0].size > 15000000){
          return setError(`The selected file is too big`);
        }
        const r = await projectStore.uploadFile({data: {id: obj.id, previous: value } , file: files[0]});
        setProp((props) => {
          if (Array.isArray(propValue)) {
            props[propKey][index] = onChange ? onChange(r.fileUrl) : r.fileUrl;
          } else {
            props[propKey] = onChange ? onChange(r.fileUrl) : r.fileUrl;
          }
        }, 500);
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <Grid item xs={full ? 12 : 6}>
      <div>
        {[`text`, `color`, `bg`, `number`, `url`].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === `slider` ? (
          <>
            {props.label ? (
              <h4 className={style.toolbarItemLabel}>{props.label}</h4>
            ) : null}
            <SliderStyled
              value={parseInt(value) || 0}
              onChange={
                ((_, value) => {
                  setProp((props) => {
                    if (Array.isArray(propValue)) {
                      props[propKey][index] = onChange
                        ? onChange(value)
                        : value;
                    } else {
                      props[propKey] = onChange ? onChange(value) : value;
                    }
                  }, 1000);
                })
              }
            />
          </>
        ) : type === `radio` ? (
          <>
            {props.label ? (
              <h4 className={style.toolbarItemLabel}>{props.label}</h4>
            ) : null}
            <RadioGroup
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type === `select` ? (
          <ToolbarDropdown
            value={value || ``}
            onChange={(value) =>
              setProp(
                (props) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : type === `image` ? (
          <label className={style.fileUpload}>
            <span>Upload image</span>
            <input type={`file`} accept="image/*" name="imgUrl" onChange={handleImageInput} />
          </label>
        ) : type === `audio` ? (
          <div className={style.audioInputWrapper}>
            <label className={style.fileUpload}>
              <span>Upload file</span>
              <input type={`file`} accept="audio/*" name="audioSrc" onChange={handleAudioInput} />
            </label>
            <span>Audio files are limited to 15MB.</span>
            {error?<span className={style.errorMessage}>{error}</span>:null}
          </div>
        ) : null}
      </div>
    </Grid>
  );
};
