import { openPage } from './services/router.js';  
import { linkTo } from './utils/methods.js';
import { _ } from './utils/elements.js';
import './services/task-list-page/task-list-page.js';

openPage('login-page');

linkTo(_.startSystemButton, 'tasks-screen-page');

linkTo(_.bottomNavTasksLink, 'tasks-screen-page');
linkTo(_.bottomNavBotLink, 'bot-page');
linkTo(_.bottomNavConfigurationsLink, 'configurations-page');

linkTo(_.loginPageGoogleLoginButton, 'tasks-screen-page');
linkTo(_.botPageBackButton, 'tasks-screen-page');
linkTo(_.taskPageBackButton, 'tasks-screen-page');
linkTo(_.configurationsPageBackButton, 'tasks-screen-page');
linkTo(_.projectPageBackButton, 'tasks-screen-page');

