
const userSignup = () => {
  respSU.innerHTML = '';
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api/user/signup');
  xhr.setRequestHeader('content-type', 'application/json');
  const body = {
    email: emailSU.value,
    password: passwordSU.value,
    admin: checkSU.checked,
  };
  xhr.send(JSON.stringify(body));
  xhr.onload = (event) => {
    respSU.innerHTML = event.target.responseText;
  };
};

const userLogin = () => {
  respLG.innerHTML = '';
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api/user/login');
  xhr.setRequestHeader('content-type', 'application/json');
  const body = {
    email: emailLG.value,
    password: passwordLG.value
  };
  xhr.send(JSON.stringify(body));
  xhr.onload = (event) => {
    respLG.innerHTML = event.target.responseText;
  };
};

const userLogout = () => {
  respLGT.innerHTML = '';
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/api/user/logout');
  xhr.send();
  xhr.onload = (event) => {
    respLGT.innerHTML = event.target.responseText;
  };
};

const getMessages = (flag) => {
  if (collapse2.className=='panel-collapse pan collapse' || flag) {
    messages.innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/blog/getMessages');
    xhr.send();
    xhr.onload = (event) => {
      messages.innerHTML = event.target.responseText;
    };
  }
};

const createMessage = () => {
  respNew.innerHTML = '';
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api/blog/createMessage');
  xhr.setRequestHeader('content-type', 'application/json');
  const body = {
    message: newMessage.value,
  };
  xhr.send(JSON.stringify(body));
  xhr.onload = (event) => {
    respNew.innerHTML = event.target.responseText;
    if (event.target.status==200) getMessages(true);
  };
};

const editMessage = () => {
  respEdit.innerHTML = '';
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api/blog/editMessage');
  xhr.setRequestHeader('content-type', 'application/json');
  const body = {
    message: edMessage.value,
    _id: idMessage.value,
  };
  xhr.send(JSON.stringify(body));
  xhr.onload = (event) => {
    respEdit.innerHTML = event.target.responseText;
    if (event.target.status==200) getMessages(true);
  };
};