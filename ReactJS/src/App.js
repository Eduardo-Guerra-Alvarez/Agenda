/* eslint-disable jsx-a11y/aria-role */
import React, { Component } from "react";

class App extends Component {

  /**
 * keep this following data as default data in agenda details as it is required for testing
 * [
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ],
 */


  state = {
    // your data goes here
    showAgenda: false,
    showAdd: true,
    newTitle: '',
    newDescription: '',
    newTopic: '',
    topics: [],
    agendas: []
  }

  validExpresion = new RegExp("[a-zA-Z]+")

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handelSubmit = (e) => {
    e.preventDefault();
  }

  addTopic = () => {
    let topics =  this.state.topics
    topics.push(this.state.newTopic)
    this.setState({
      topics: topics,
    })
    this.setState({ newTopic: ''})
  }

  addAgenda = () => {
    const newAgenda = {
      title: this.state.newTitle,
      description: this.state.newDescription,
      topics: this.state.topics
    }
    this.setState(prev => ({
      agendas: [...prev.agendas, newAgenda]
    }))
    console.log(this.state.agendas)
  }

  // your methods goes here

  render() {
    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>
        {/* show/hide this following add agenda template */
          this.state.showAdd && (
            <div className="container" role="addAgenda">
            <button className="btn btn-info" role="goToView"
            onClick={() => this.setState({ showAgenda: true, showAdd: false })}
            >Click To View Agenda</button>
            <form onSubmit={this.handelSubmit}>
              <div className="my-3">
                <label className="form-label">Title</label>
                {/* title */}
                <input type="text" 
                name="newTitle" 
                placeholder="Enter the title" 
                className="form-control" 
                role="inputTitle"
                onChange={this.handleChange}
                value={this.state.newTitle}
                 />
                <small className="text-danger" data-testid="invalidTitle">
                  {/**
                   * show empty string if title input is valid
                   * else show 'Title is required'
                   */
                  this.validExpresion.test(this.state.newTitle) ? "" : "Title is required"
                    //this.state.newTitle ? "" : this.state.newTitle.trim ? "" :  "Title is required"
                   }
                </small>
              </div>
              <div className="my-3">
                <label className="form-label">Description</label>
                {/* description */}
                <input 
                type="text" 
                name="newDescription" 
                placeholder="Enter the description" 
                className="form-control" 
                role="inputDescription"
                onChange={this.handleChange}
                value={this.state.newDescription}
                 />
                <small className="text-danger" data-testid="invalidDescription">
                  {/**
                   * show empty string if description input is valid
                   * else show 'Description is required'
                   */
                   this.validExpresion.test(this.state.newDescription) ? "" : "Description is required"
                   }
                </small>
              </div>
              <div className="my-3 w-50">
                <label className="form-label">Enter topic</label>
                {/* topic */}
                <input 
                type="text" 
                name="newTopic" 
                placeholder="Enter the topic" 
                className="form-control" 
                role="inputTopic" 
                onChange={this.handleChange}
                value={this.state.newTopic}
                />
                <small className="text-danger" data-testid="invalidTopic">
                  {/**
                    * show empty string if topic input is valid
                    * else show 'Topic is required'
                    */
                    this.validExpresion.test(this.state.newTopic) ? "" : this.state.topics.length != 0 ? "" : "Topic is required"
                  }
                </small>
              </div>
              {/* on click should add topics and disable the button if invalid topic */}
              <button 
              className="btn btn-success addAlign" 
              role="addTopicBtn"
              disabled={!this.validExpresion.test(this.state.newTopic)}
              onClick={this.addTopic}
              >+ Add Topic</button>
              {/* on click should add agenda details and disable the button if invalid inputs */}
              <button 
              className="btn btn-success submitAlign" 
              role="submitAgendaBtn"
              disabled={this.state.newTitle == "" ||
              this.state.newDescription == "" ||
              this.state.topics.length == 0 }
              onClick={this.addAgenda}
              >Submit Agenda</button>
            </form>
            {/* show if no topics added yet */
            this.state.topics.length == 0 && (
              <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
                 No Topics Added
              </div>
            )}
            {/* display the list of topics added using li */}
              <div className="card my-3">
                <div className="card-header">Added Topics</div>
                <div className="card-body">
                  <ul className="list-group">
                      
                      {/* topics list */
                        this.state.topics.map((topic, index) => (
                        <li className="list-group-item" role="topicList" key={index}>
                          {topic}
                          </li>
                        ))
                      }
                  </ul>
                </div>
                <div className="card-footer">Refer the topics you added</div>
              </div>
          </div>
          )}
        {/* show/hide this following view agenda template */
          this.state.showAgenda && (
            <div className="container" role="viewAgenda">
            <button className="btn btn-info" role="goToAdd"
            onClick={() => this.setState({ showAdd: true, showAgenda: false })}
            >Click To Add Agenda</button>
            {/* iterate the agenda details to display */
              this.state.agendas.map((agenda, index) => (
                <div className="card my-3" role="cards" key={index}>
                <div className="card-header">
                  {agenda.title}
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    {/* iterate the topics to display */
                      agenda.topics.map((topic, index) => (
                        <li className="list-group-item" key={index}>
                        {topic}
                      </li>
                      ))
                    }
                      
                  </ul>
                </div>
                <div className="card-footer">
                  {agenda.description}
                </div>
              </div>
              ))
            }
              
          </div>
          )}
      </div>
    );
  }

}

export default App;