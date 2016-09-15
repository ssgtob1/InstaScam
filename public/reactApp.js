    var userName = "";
    
    var InstaScam = React.createClass({

        getInitialState: function() {
            return {loggedInUser: ""};
        },

        logMeIn: function(userId) {
            this.setState({loggedInUser : userId});
        },

        render: function() {
            if (this.state.loggedInUser !== "") {
                return(<PicList user={this.loggedInUser} />);
            } else {
                return (
                    <Login setLoggedIn={this.logMeIn} />
                    
                );

            }
        }

    });

    var Register = React.createClass({
        getInitialState: function(){
            return {registered: false};
        },
        handleClick: function(){

        },
        render: function(){
            return (
                <div className="span3 offset8 pull-left" >
                            <a href="#" className="btn btn-primary btn-large" onClick={this.handleClick}><i className="icon-white icon-user"></i> Register New User</a>
                </div>
            )

        }
    });

    var Login = React.createClass({
        getInitialState: function() {
            return {error: false};
        },

        handleClick: function(event) {
            userName = $("#userid").val();
            userPassword = $("#password").val();
            var userObj = {
                "userName": userName,
                "password": userPassword
            };
            var that = this;
            $.post("/login/", userObj, function(data) {
               
            }).done(function(loggedInUser) {
                that.setState({error: false});
                that.props.setLoggedIn(loggedInUser.userName);

            }).fail(function() {
                $("#instahome").hide();   
                that.setState({error: true});
            })
                
        },

        render: function() {
            if (this.state.error) {
                return (
                     <div className="everything">
                        <div className="form">

                          
                            <h2><span className="entypo-login"></span> InstaScam Login</h2>
                            <button className="login" onClick={this.handleClick}><span className="entypo-lock"></span></button>
                            <span className="entypo-user inputUserIcon"></span>
                            <input type="text" className="user" placeholder="username" name="userid" id="userid"/>
                            <span className="entypo-key inputPassIcon"></span>
                            <input type="password" className="pass" placeholder="password" name="password" id="password"/>
                            <h1 style={{color:777}}>Login Failed. Please retry.</h1>
                            
                        </div>
                        <Register />
                    </div>
                );
            } else {
                return (
                     <div className="everything">
                        <div className="form">

                          
                            <h2><span className="entypo-login"></span> InstaScam Login</h2>
                            <button className="login" onClick={this.handleClick}><span className="entypo-lock"></span></button>
                            <span className="entypo-user inputUserIcon"></span>
                            <input type="text" className="user" placeholder="username" name="userid" id="userid"/>
                            <span className="entypo-key inputPassIcon"></span>
                            <input type="password" className="pass" placeholder="password" name="password" id="password"/>
                            
                          
                        </div>
                        <Register />
                    </div>


 

                );
            }
        }
    }); 

    var PicList = React.createClass({
        getInitialState: function() {
            return {picList : [] };
        },

        componentWillMount: function() {
                var that = this;
                $.getJSON("/userfeed/" + this.props.user, function( data ) {
                     that.setState({picList: data});
                     
                }); 
        },
        
        render: function() {
                    return (
                        <div id="twitterHome">
                            <h1>Welcome to Twitter Clone!</h1>
                            <div className="yui3-g">
                                <div className="yui3-u-1">
                                    welcome
                                </div>
                                <div className="yui3-u-2-3">
                                    <div id="tweetFeed"> 
                                        {
                                            this.state.tweetList.map(function(val, idx) {
                                                    return <Tweet key={val.time} data={val}/>;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    );


       
  

    }
    });

    var Tweet = React.createClass({
        getInitialState: function() {
            return {};
        },

        render: function() {
            return (
                <div className="yui3-g">
                    <div className="yui3-u">
                        <div className="yui3-g">
                            <div className="yui3-u-1">
                                {this.props.data.tweetText}
                            </div>
                            <div className="yui3-u-1-2">{this.props.data.name}</div>
                            <div className="yui3-u-1-2">{this.props.data.time}</div>
                        </div>
                    </div> 
                </div>

            );
        }
    });                       

    ReactDOM.render(
        <InstaScam />,
        document.getElementById('InstaScam')
    );


