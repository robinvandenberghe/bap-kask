import React from "react";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./FDDetail.module.css";
import ProjectCover from "../components/ProjectCover";
import cx from 'classnames';
import { observer } from "mobx-react";

const FDDetail = () => {
  const { projectStore } = useStores();
  return (
    <div className={cx(stylesLayout.layout, style.sectionGrid)} >
      <h2>
        <span className={`visually-hidden`}>Festival Digital</span>
        <img alt={`Festival Digital logo`} src={`/assets/img/festivalDigitalLogo.svg`} />
      </h2>
      <section className={style.topInfo}>
        <img className={style.backgroundRaster} alt={`raster`} src={`/assets/img/overzichtRasterMd.png`}/>
        <article className={style.whoAreWe}>
          <h3>Who are we</h3>
          <p>We are students who study Digital storytelling. We make all kinds of work like podcasts, youtube channels, games, instagram pages,... We would like to showcase our works a little differrent this year. We came with a cool way to let you take a look in our world.</p>
        </article>
        <article className={style.weAr}>
          <div className={style.weArContent}>
            <h3>We AR the internet</h3>
            <p>With We AR the Internet we want to highlight an entire digital generation. By creating an anti establishment movement against the classical approach of design museums we are raising our voice that digital art deserves a place as well. The Internet is here and won’t leave. We create art. We belong in a museum.</p>
          </div>
          <img alt={`circle`} src={`/assets/img/weArCircle.svg`} className={style.weArCircle} />
          <div className={style.shadowBlock} />
        </article>
      </section>
      <section className={style.howItWorks}>
        <div className={style.howItWorksText}>
          <h3>How it works</h3>
          <p>To give digital art the recognition that it deserves we are offering the visitors of the digital gradution expo the chance to experience every project in augmented reality. Take your phone, scan the code and relive the project.</p>
        </div>
        <div className={style.howSteps}>
          <div className={style.howStep}>
            <img alt={`Scan icon`} src={`/assets/img/scanIcon.svg`}/>
            <span>Scan</span>
          </div>
          <div className={style.howStep}>
            <img alt={`View icon`} src={`/assets/img/viewIcon.svg`}/>
            <span>View</span>
          </div>
          <div className={style.howStep}>
            <img alt={`Save icon`} src={`/assets/img/saveIcon.svg`}/>
            <span>Save</span>
          </div>
          <div className={style.howStep}>
            <img alt={`Visit icon`} src={`/assets/img/visitIcon.svg`}/>
            <span>Visit</span>
          </div>
        </div>
      </section>
      <section className={style.ourWorks}>
        <h3>Our digital works</h3>
        <ul className={style.workList}>
          {projectStore.projects.filter((i)=>i.study.id===22).map((project, index)=><ProjectCover key={index} project={project}/>)}
        </ul>
      </section>
    </div>

  );
};

export default observer(FDDetail);