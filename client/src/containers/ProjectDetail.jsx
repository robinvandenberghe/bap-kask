import React from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const {id} = useParams();
  const { projectStore } = useStores();
  const { user, study, coverUrl, title} = projectStore.projects.find((item)=>item.id===id);
  const history = useHistory();
  // history.replace(`/projects/${slugify(title)}`);

  return (
    <div className={stylesLayout.gridLayout}>
      <section >
        {title}
      </section>
      <section className={style.container}>

      </section>
    </div>
  );
};

const slugify = (string)  => {
  return string
      .normalize(`NFD`) // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, ``) // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, ``) // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, `-`) // separator
}

export default ProjectDetail;
