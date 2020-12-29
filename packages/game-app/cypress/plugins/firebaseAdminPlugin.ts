import * as tasks from './firebaseTasks';
import * as admin from 'firebase-admin';

export default function pluginWithTasks(
  cypressOnFunc: any,
  cypressConfig: any,
) {

  const app = admin.initializeApp({projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID});

  // create tasks closure with firebase instance so that can be called using cy.task
  const tasksWithFirebase: Record<string, (taskSettings: any) => any> = {};
  Object.keys(tasks).forEach((taskName) => {
    tasksWithFirebase[taskName] = (taskSettings: any): any => {
      return (tasks as any)[taskName](
        app,
        taskSettings
      );
    };
  });

  cypressOnFunc('task', tasksWithFirebase);

  return cypressConfig;
}
