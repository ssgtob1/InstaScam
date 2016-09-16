var userName = "";
var userPassword = "";
var InstaScam = React.createClass({

    getInitialState: function () {
        return { loggedInUser: "" };
    },

    logMeIn: function (userId) {
        this.setState({ loggedInUser: userId });
    },

    render: function () {
        if (this.state.loggedInUser !== "") {
            return (<PicList user={this.state.loggedInUser} />);
        } else {
            return (
                <Login setLoggedIn={this.logMeIn} />

            );

        }
    }

});

var Register = React.createClass({
    getInitialState: function () {
        return { registered: false };
    },
    handleClick: function () {

    },
    render: function () {
        return (
            <div className="span3 offset8 pull-left" >
                <a href="#" className="btn btn-primary btn-large" onClick={this.handleClick}><i className="icon-white icon-user"></i> Register New User</a>
            </div>
        )

    }
});

var Login = React.createClass({
    getInitialState: function () {
        return { error: false };
    },

    handleClick: function (event) {
        userName = $("#userid").val();
        userPassword = $("#password").val();
        var userObj = {
            "userName": userName,
            "password": userPassword
        };
        console.log(userObj.userName);
        var that = this;
        $.post("/login/", userObj, function (data) {

        }).done(function (loggedInUser) {
            console.log('about to set state');
            that.setState({ error: false });
            console.log('after set state');
            console.log(loggedInUser);
            that.props.setLoggedIn(loggedInUser.UserName);

        }).fail(function () {
            $("#instahome").hide();
            that.setState({ error: true });
        })

    },

    render: function () {
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
                        <h1 style={{ color: 777 }}>Login Failed.Please retry.</h1>

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
    getInitialState: function () {
        return { picList: [] };
    },

    componentDidMount: function () {
        var that = this;
        console.log(this.props.user);
        $.getJSON("/getPictures/" + this.props.user, function (data) {
            that.setState({ picList: data });
        });
    },

    render: function () {
        return (
            <div id="instahome">
                <h1>Welcome to Instagram Pictures!</h1>
                <div className="yui3-g">
                    <div className="yui3-u-1">
                        Welcome
                    </div>
                    <div className="yui3-u-2-3">
                        <div id="picFeed">
                            {
                                this.state.picList.map(function (val, idx) {
                                    return <Pic key={idx} data={val}/>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );





    }
});

var Pic = React.createClass({
    getInitialState: function () {
        return {};
    },

    render: function () {
        var data = this.props.data;
        var picLocation = "/photos/" + data.UserName + "/" + data.SystemFileName;
        return (
            <div className="row">
                <div className="span2 offset5">
                    <img src={picLocation}/>
                    <br/>
                    File: {data.ActualFileName}
                </div>
            </div>

        );
    }
});

ReactDOM.render(
    <InstaScam />,
    document.getElementById('InstaScam')
);


