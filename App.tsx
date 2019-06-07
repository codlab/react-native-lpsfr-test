import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {ConfigManager, ProjectDatabase} from "react-native-lpsfr";
import { Project } from 'react-native-lpsfr/lib/db/models';
import { ProjectInterface } from 'react-native-lpsfr/lib/db/models/Project';
import uuid from "uuid";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {

};

interface State {

};

export default class App extends Component<Props, State> {

  _config_manager: ConfigManager;
  _project_database: ProjectDatabase;
  constructor(props: Props) {
    super(props)


    this._config_manager = new ConfigManager();
    this._project_database = new ProjectDatabase(this._config_manager);
  }

  componentDidMount() {
    this._project_database.init()
    .then(() => this._project_database.list(Project))
    .then(list => {

      console.warn("list of project saved :" + list.length, list);

      const data: ProjectInterface = {
        name: "some name " + (new Date()).toString(),
        uuid: uuid.v4()
      };
      const project: Project = this._project_database.instantiate(data, Project);
      return project.save().then(saved => project);
    })
    .then(project => console.warn("new project", project));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
