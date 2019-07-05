import React, { Component } from 'react';
//import React in our project
import { StyleSheet,Text,View, TouchableHighlight, ScrollView, TouchableOpacity, Switch, Button } from 'react-native';
//import all the required components
import { Stopwatch} from 'react-native-stopwatch-timer';
import moment from 'moment';
//importing library to use Stopwatch and Timer

export default class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        start: 0,
        now: 0,
        prev: 0,
        isGoing: false,
        entries: [],
        opts2: [{id: 1, active: false}, {id: 2, active: false}, {id: 3, active: false} ],
        activeChoice: '',

        opts: ['one', 'two', 'three'],
        selectedOpt: 'none',



        op1: false,
        op2: false,
        op3: false,
        asd: 'ciao',

      isStopwatchStart: false,
      resetStopwatch: false,

    };
  }
    componentWillUnmount() {
        clearInterval(this.timer);
       /* this.setState( {
            isGoing: false,
            start: 0,
            now: 0,
            readyToExport: false,
        }); */
    }
  setActive(item) {
      if (item === this.state.activeChoice) return;
      this.setState( {
          activeChoice: item,
          prev: this.state.now - this.state.start
      });
      this.addEntry(item);
  }
  start = () => {
      const now = new Date().getTime();
      this.setState( {
          isGoing: true,
          start: now,
          now,
      });
      this.timer = setInterval( () => {
          this.setState({now: new Date().getTime()})
      }, 100)
  };
  stop = () => {
        clearInterval(this.timer);
       this.setState({
            isGoing: false,
            readyToExport: true,
        })
    };
  addEntry = () => {
    //  let newEntryTime = this.state.now - this.state.start - this.state.prev;
   //   let newEntryFormat = "Duration: "+ newEntry.minutes().toString() + "min " + newEntry.seconds().toString() + "sec";
      let entryArr = this.state.entries;
      entryArr.unshift({id: this.state.activeChoice, startTime: this.state.prev, endTime: this.state.now - this.state.start});
      this.setState( ({
          entries: entryArr
      }))
  };


  resume = () => {
        const now = new Date().getTime();
        this.setState({
            start: now,
            now,
        });
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime()})
        }, 100)
    };
  render() {
    const {now, start, entries} = this.state;
    const timer = now - start;
    const items = this.state.opts2.map((item) => {
        return (
            <CButton title={item.id}
                     color='#ffff'
                     background='#4287f5'
                     key={item.id}
                     action={() => this.setActive(item.id)}
                     active={item.id === this.state.activeChoice}
            />
        )
    });
    return (
        <View style={styles.container}>
            <View style={{marginTop:32, alignItems:'center'}}>
                <Timer
                    interval={timer}
                    style={styles.timeText}
                />
          </View>
            <ABBUTTON title='asdingo' onPress={ (this.state.isGoing === false) ? this.start : this.stop}/>
          <View>
            <ButtonRow>
              <CButton title={this.state.activeChoice} color='#ffff' background='#4287f5'/>
              <CButton title='op2' color='#ffff' background='#9ac259'/>
            </ButtonRow>
              <ButtonRow>
                  {items}
              </ButtonRow>

            <EntryTable entries={this.state.entries}/>

          </View>
        </View>
    );
  }
}
function Timer({ interval, style }) {
    const pad = (n) => n < 10 ? '0' + n : n;
    const duration = moment.duration(interval);
    const deciseconds = Math.floor(duration.milliseconds() / 100);
    return (
        <View style={styles.timer}>
            <Text style={style}>{pad(duration.minutes())}:</Text>
            <Text style={style}>{pad(duration.seconds())},</Text>
            <Text style={style}>{deciseconds}</Text>
        </View>
    )
}
function ABBUTTON ({title, onPress}) {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={styles.someBG}>
            <Text>{title}</Text>
            </TouchableOpacity>
    )
}
function CButton({ title, color, background, active, bool, action }) {
  const CButtonStyle = [
      styles.cButton,
      active && styles.active
  ];
  return (
      <TouchableOpacity style={[ {backgroundColor: background}, CButtonStyle]} onPress={action}>
        <View>
        <Text style={[styles.cButtonText, {color}]}>{title}</Text>
        <Text style={[styles.cButtonText, {color}]}>{bool}</Text>
        </View>
      </TouchableOpacity>

  )
}
function ButtonRow({ children }) {
  return (
      <View style={styles.buttonRow}>{children}</View>)
}
function Entry({ name, interval}) {
      let newEntry = moment.duration(interval);
      let newEntryFormat = "Duration: "+ newEntry.minutes().toString() + "min " + newEntry.seconds().toString() + "sec";
  return (
      <View >
        <Text style={styles.entry}>N: {name}</Text>
        <Text style={styles.entry}>{newEntryFormat}</Text>
      </View>
  )
}
function EntryTable({entries}) {
  return (
      <ScrollView style={styles.entries}>
        {entries.map((entry, index) => (
            <Entry name={entry.id} key={index} interval={entry.endTime-entry.startTime}/>
        ))}
      </ScrollView>
  )
}
const handleTimerComplete = () => alert(global.currentTime);
const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems:'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  }
};
const styles = StyleSheet.create({
  mainList: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: {flex:1, alignItems:'center', backgroundColor: '#0d0d0d' },
   btnText1: {fontSize: 20, marginTop:10, color: '#fff' },
  cButton: {
    width: 140,
    height: 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  cButtonText: {
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  entry: {
    color:  '#fff',
  },
  entries: {
    height: 50,
   marginLeft: 50,
  },
  active: {
      backgroundColor: '#88909e'
  },
  timeText: {
      fontSize: 30,
      color: '#875154'
  },
  timer: {
      flexDirection: 'row',
      fontSize: 30,
      marginTop: 20,
      color: '#875154',
  },
  someBG: {
      width: 100,
      height: 30,
      backgroundColor: '#875154'
  }


});
