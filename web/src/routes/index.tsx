import React from 'react';

// import { Navigate, Routes as SwitchRoutes } from 'react-router-dom';
import { Navigate, Route, Routes as SwitchRoutes } from 'react-router-dom';

// import Route from './Route';

import AppPage from 'components/AppPage';

import CreateClasses from 'pages/Classes/CreateClasses';
import ListClasses from 'pages/Classes/ListClasses';
import GenerateForms from 'pages/Forms/GenerateForms';
import ListTopicsForms from 'pages/Forms/ListForms';
import StandardForms from 'pages/Forms/StandardForms';
import CreateKeywords from 'pages/Keywords/CreateKeywords';
import ListKeywords from 'pages/Keywords/ListKeywords';
import Profile from 'pages/Profile';
import CreateQuestions from 'pages/Questions/CreateQuestions';
import ListQuestions from 'pages/Questions/ListQuestions';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import ListStudents from 'pages/Students/ListStudents';
import CreateSubjects from 'pages/Subjects/CreateSubjects';
import ListSubjects from 'pages/Subjects/ListSubjects';
import ListTeachers from 'pages/Teachers/ListTeachers';
import AnswerTest from 'pages/Tests/AnswerTest';
import ListTests from 'pages/Tests/ListTests';
import CreateTopics from 'pages/Topics/CreateTopics';
import ListTopics from 'pages/Topics/ListTopics';

import { useAuth } from '../hooks/auth';
import Dashboard from '../pages/Dashboard';
import Ranking from '../pages/Ranking';

const ONLY_TEACHERS = true;

const protect = (element: JSX.Element, onlyTeachers = false) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
 
  if (!user) {
    return <Navigate to={'/sign-in'}/>;
  }
  
  if (onlyTeachers && !user.isTeacher) {
    return <Navigate to={'/sign-in'}/>;
  }

  return <AppPage>{element}</AppPage>;
}

const Routes: React.FC = () => (
  <SwitchRoutes>
    <Route path="/" element={<SignIn />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/profile" element={protect(<Profile />)} />
    <Route path="/dashboard" element={protect(<Dashboard />)} />
    <Route path="/ranking" element={protect(<Ranking />)} />
    <Route path="/teachers" element={protect(<ListTeachers />)} />
    <Route path="/students" element={protect(<ListStudents />)} />
    
    <Route path="/topics" element={protect(<ListTopics />)} />
    <Route path="/topics/create" element={
      protect(<CreateTopics />, ONLY_TEACHERS)} 
    />
    <Route path="/topics/:id" element={
      protect(<CreateTopics />, ONLY_TEACHERS)} 
    />
    
    <Route path="/topics/:topic/keywords" element={protect(<ListKeywords />)} />
    <Route path="/topics/:topic/keywords/create" element={
      protect(<CreateKeywords />, ONLY_TEACHERS)} 
    />
    <Route path="/topics/:topic/keywords/:id" element={
      protect(<CreateKeywords />, ONLY_TEACHERS)} 
    />
    
    <Route path="/topics/:topic/questions" element={protect(<ListQuestions />)} />
    <Route path="/topics/:topic/questions/create" element={
      protect(<CreateQuestions />, ONLY_TEACHERS)} 
    />
    <Route path="/topics/:topic/questions/:id" element={
      protect(<CreateQuestions />, ONLY_TEACHERS)} 
    />

    <Route path="/forms/" element={protect(<ListTopicsForms />)} />
    <Route path="/topics/:topic/standard-form" element={protect(<StandardForms />)} />
    <Route path="/topics/:topic/generate-form" element={protect(<GenerateForms />)} />



    <Route path="/classes" element={protect(<ListClasses />)} />
    <Route path="/classes/create" element={
      protect(<CreateClasses />, ONLY_TEACHERS)} 
    />
    <Route path="/classes/:id" element={
      protect(<CreateClasses />, ONLY_TEACHERS)} 
    />    

    <Route path="/subjects" element={protect(<ListSubjects />)} />
    <Route path="/subjects/create" element={
      protect(<CreateSubjects />, ONLY_TEACHERS)} 
    />
    <Route path="/subjects/:id" element={
      protect(<CreateSubjects />, ONLY_TEACHERS)} 
    />

    <Route path="/tests" element={protect(<ListTests />)} />
    <Route path="/tests/:id" element={
      protect(<AnswerTest />)} 
    />
    <Route path="*" element={<Navigate to={'/'}/>} />
  </SwitchRoutes>
);

export default Routes;
