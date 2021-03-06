import React, { useState, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite"
import lz from 'lzutf8';
import { Editor, Element } from '@craftjs/core';
import { Container, Text, Video, Button, Image, AppContainer, Credits, Audio } from '../components/selectors';
import { RenderNode, Viewport } from '../components/editor';
import { useStores } from "../hooks/useStores";
import { useObject } from "../hooks/useObject";
import stylesLayout from "../styles/layout.module.css";
import style from './ProjectDetail.module.css';
import ROUTES from "../constants";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projectStore } = useStores();
  const { setObject } = useObject();
  const project = projectStore.projects.find((item)=>item.slug===slug);
  const [enabled] = useState(false);

  useEffect(()=>{
    setObject(project);
  }, [project])

  if(project){
    const {  user, study, title, subject, content} = project;
    const uint8array = lz.decodeBase64(content);
    const json = lz.decompress(uint8array);
    return (
      <section className={stylesLayout.layout}>
        <Editor
            resolver={{
              Container,
              Text,
              Button,
              Video,
              Image,
              AppContainer,
              Credits,
              Audio
            }}
            enabled={enabled}
            onRender={RenderNode}
            project={project}
          >
            <Viewport object={{
              item: project,
              type: `project`,
              json,
              template: <Element
              id={`appContainer`}
              canvas
              is={AppContainer}
              width="100%"
              height="auto"
              background={{ r: 255, g: 255, b: 255, a: 0 }}
              padding={[`10`, `10`, `10`, `10`]}
              flexDirection={`row`}
            >
              <Element
                canvas
                is={Container}
                id={`topContainer`}
                width="100%"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 0 }}
                flexDirection={`row`}
              >
                <Element
                  is={Image}
                  id={`defaultImage`}
                  width='260px'
                  height='260px'
                  canvas
                />
                <Element
                  canvas
                  is={Container}
                  id={`topTextContainer`}
                  width="auto"
                  height="auto"
                  background={{ r: 255, g: 255, b: 255, a: 0 }}
                  margin={[`0`,`0`,`0`,`50`]}
                  padding={[`20`, `10`, `10`, `10`]}
                >
                  <Element
                  is={Text}
                  id={`topText`}
                  color={{ r: 0, g: 0, b: 0, a: 1 }}
                  fontSize={18}
                  text={`Place your text here.`}
                  />
                </Element>
              </Element>
              <Element
                canvas
                is={Container}
                id={`bottomContainer`}
                width="100%"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 0 }}
                margin={[`40`,`0`,`0`,`0`]}
                flexDirection={`row`}
                alignItems={`center`}
                justifyContent={`space-between`}
              >
                <Element
                  canvas
                  is={Credits}
                  id={`creditsContainer`}
                >
                  <Element
                    is={Text}
                    color={{ r: 0, g: 0, b: 0, a: 1 }}
                    fontSize={18}
                    fontWeight={`400`}
                    id={`creditsFirstLine`}
                    text={`Place your text here.`}
                  />
                </Element>
                <Element
                  canvas
                  is={Container}
                  id={`buttonContainer`}
                  width="auto"
                  height="auto"
                  background={{ r: 255, g: 255, b: 255, a: 0 }}
                  margin={[`0`,`0`,`0`,`50`]}
                  padding={[`20`, `10`, `10`, `10`]}
                >
                  <Element
                  is={Text}
                  color={{ r: 0, g: 0, b: 0, a: 1 }}
                  fontSize={18}
                  fontWeight={`600`}
                  text={`Links`}
                  id={`linksTitle`}
                  />
                  <Button
                  is={Text}
                  color={{ r: 255, g: 255, b: 255, a: 1 }}
                  background={{ r: 0, g: 0, b: 0, a: 1 }}
                  fontSize={18}
                  id={`defaultButton`}
                  text={`Button link`}
                  />
                </Element>
              </Element>
            </Element> }}>
              <div className={style.infoContainer}>
                <h4><NavLink to={ROUTES.profileDetail.to+user.id}>{user.name + ` ` + user.surname} </NavLink>{`, ` + title}</h4>
                <p className={style.subjectTitle}>{study.title + ` - ` + subject.title}</p>
              </div>
            </Viewport>
          </Editor>
      </section>
    );
  }else{
    return(
      <section className={stylesLayout.layout}>
        <div className={style.loadingContainer}>
          <h3>Loading project...</h3>
          <img alt={`Loading animation`} src={`/assets/img/loading.svg`} />
        </div>
      </section>
    )
  }

};

export default observer(ProjectDetail);
