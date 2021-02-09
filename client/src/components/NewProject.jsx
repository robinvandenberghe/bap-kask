import React, { useState } from "react";
import { useStores } from "../hooks/useStores";
import style from "./NewProject.module.css";
import TextInputField from './TextInputField';
import { observer } from "mobx-react";
import ROUTES from "../constants";
import { useHistory } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import User from "../models/User";

const NewProject = () => {
  const {projectStore, uiStore} = useStores();
  const history = useHistory();
  const [ error, setError ] = useState();
  const [ email, setEmail ] = useState(``);
  const [ name, setName ] = useState(``);
  const [ surname, setSurname ] = useState(``);
  const [ title, setTitle ] = useState(``);
  const [ study, setStudy ] = useState(``);
  const [ subject, setSubject ] = useState(``);
  const [ cover, setCover ] = useState();
  const [ coverUrl, setCoverUrl ] = useState(`/assets/img/defaultCover.jpg`);
  const reader = new FileReader();
  reader.addEventListener(`load`, ()=>{
    setCoverUrl(reader.result);
  });

  const handleImageInput = async (e) => {
    const files = [...e.target.files];
    if(files.length > 0){
      const compressedFile = await imageCompression(files[0], {maxSizeMB: 1, maxWidthOrHeight: 400});
      reader.readAsDataURL(compressedFile);
      setCover(compressedFile);
    }
  }

  const handleSubmit = async () => {
    if(!cover){
      return setError({
        name: `cover`,
        id: `EMPTY`,
        message: `Please enter a cover image.`
      });
    }
    if(!email){
      return setError({
        name: `email`,
        id: `EMPTY`,
        message: `Please enter the students e-mail.`
      });
    }
    if(!name){
      return setError({
        name: `name`,
        id: `EMPTY`,
        message: `Please enter the students first name.`
      });
    }
    if(!surname){
      return setError({
        name: `surname`,
        id: `EMPTY`,
        message: `Please enter the students last name.`
      });
    }
    if(!title){
      return setError({
        name: `title`,
        id: `EMPTY`,
        message: `Please enter the works title`
      });
    }
    if(!study){
      return setError({
        name: `study`,
        id: `EMPTY`,
        message: `Please select the students education.`
      });
    }
    if(!subject){
      return setError({
        name: `subject`,
        id: `EMPTY`,
        message: `Please select the works subject.`
      });
    }
    const userObj = new User();
    userObj.updateFromServer({id: userObj.id, name, email, surname, role: `student`});
    const u = await uiStore.createStudent(userObj);
    if(!u.success){
      return setError(u.error);
    }
    userObj.updateFromServer(u.user);
    const d = {userObj, studyId: study, subjectId: subject, title, slug: slugify(`${name} ${surname} ${title}`), cover};
    const r = await projectStore.addProject(d);
    if(!r.success){
      return setError(r.error);
    }
    if(r.project.userName===name){
      setError();
      setEmail();
      setName();
      setSurname();
      setTitle();
      setStudy();
      setSubject();
      history.push(ROUTES.projectDetail.to + r.id);
    }else{
      return setError({
        name: `email`,
        id: `SOMETHING_WRONG`,
        message: `Something went wrong in the process.`
      });
    }
  }

  return (
    <section className={style.container}>
      <label htmlFor="cover" className={style.coverImage}>
        <span>Cover Image</span>
        <img src={coverUrl} alt={`cover`} />
        <input type={`file`} accept="image/*" name="cover" id="cover" onChange={handleImageInput} />
      </label>
      <div className={style.sideContainer}>
        <TextInputField type={`email`} value={email} setValue={setEmail} name={`email`} label={`Email address`} error={error} placeholder={`Enter your email address.`} setError={setError} />
        <TextInputField type={`text`} value={name} setValue={setName} name={`name`} label={`First name`} error={error} placeholder={`Enter the student his/her first name.`} setError={setError} />
        <TextInputField type={`text`} value={surname} setValue={setSurname} name={`surname`} label={`Last name`} error={error} placeholder={`Enter the student his/her last name.`} setError={setError} />
      </div>
      <div className={style.sideContainer}>
        <TextInputField  type={`text`} value={title} setValue={setTitle} name={`title`} label={`Title work`} error={error} placeholder={`Enter the title of the work.`} setError={setError} />
        <label htmlFor="studies" className={style.selectWrapper}>
          <span>Education</span>
          <select id="studies" onChange={(e)=>setStudy(e.target.value)} value={study} className={style.selectInput}>
            <option value={``} disabled>Select the student his/her education.</option>
            {projectStore.studies.map((i, index)=><option key={index} value={i.id}>{i.title}</option>)}
          </select>
          {error&&error.name===`study`?<span className={style.selectError}>{error.message}</span>:null}
        </label>
        <label htmlFor="subjects" className={style.selectWrapper}>
          <span>Subject</span>
          <select onChange={(e)=>setSubject(e.target.value)} value={subject} id="subjects" className={style.selectInput}>
            <option value={``} disabled>Select the type of work.</option>
            {projectStore.subjects.map((i, index)=><option key={index} value={i.id}>{i.title}</option>)}
          </select>
          {error&&error.name===`subject`?<span className={style.selectError}>{error.message}</span>:null}
        </label>
        <div className={style.submitButton} onClick={handleSubmit}>Create work</div>
      </div>
    </section>
  );
};

export default observer(NewProject);

const slugify = (string)  => {
  return string
      .normalize(`NFD`) // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, ``) // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, ``) // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, `-`) // separator
}