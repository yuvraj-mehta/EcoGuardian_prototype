// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Initialize Firebase
  // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyD9vDZLySRYWUw204G8pLGqLfdqNExPjLU",
  //   authDomain: "eco-guardian-6e875.firebaseapp.com",
  //   databaseURL: "https://eco-guardian-6e875-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "eco-guardian-6e875",
  //   storageBucket: "eco-guardian-6e875.appspot.com",
  //   messagingSenderId: "860311825180",
  //   appId: "1:860311825180:web:88b646b06fff0ca280a8d9",
  //   measurementId: "G-25LJS927VY"
  // };

  var firebaseConfig = {
    apiKey: "AIzaSyDcEDmLdBQDlu81Ls9xMU7emfRdTau9lzg",
    authDomain: "ecoguardian-1333f.firebaseapp.com",
    databaseURL: "https://ecoguardian-1333f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecoguardian-1333f",
    storageBucket: "ecoguardian-1333f.appspot.com",
    messagingSenderId: "534858180763",
    appId: "1:534858180763:web:4c437b50031dc4b7b0be3e"
  };

  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database()
  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class EcoGuardianChat{
    // Home() is used to create the home page
    home(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() is used to create the chat page
    chat(){
      this.create_title()
      this.create_chat()
    }
    // create_title() is used to create the title
    create_title(){
      // This is the title creator.
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'Eco-Guardian Chat '

      // var title_description = document.createElement('h2')
      // title.setAttribute('id', 'title_description')
      // title.textContent = 'Eco-Guardian Chat for cleaning drive near Gandhi ghat'

      var subtitle = document.createElement('p')
      subtitle.textContent = ':Community of students in NIT Patna'
      subtitle.setAttribute('id', 'subtitle')
      subtitle.style.fontSize = '45px'
      subtitle.style.marginTop = '5px'

      // title_inner_container.append(title_description)
      title_inner_container.append(title, subtitle)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }
    // create_join_form() creates the join form
    create_join_form(){
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!
      var parent = this;

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = 'No.... It\'s Yuvraj Mehta'

      join_input.onkeyup  = function(){
        if(join_input.value.length > 0){
          join_button.classList.add('enabled')
          join_button.onclick = function(){
            parent.save_name(join_input.value)
            join_container.remove()
            parent.create_chat()
          }
        }else{
          join_button.classList.remove('enabled')
        }
      }

      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }
    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }
    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="fa-regular fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      chat_input.setAttribute('maxlength', 1000)
      chat_input.placeholder = `${parent.get_name()}. Say something...`

      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            parent.create_load('chat_content_container')
            parent.send_message(chat_input.value)
            chat_input.value = ''
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled')
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`

      chat_logout.onclick = function(){
        localStorage.clear()
        parent.home()
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      parent.create_load('chat_content_container')
      parent.refresh_chat()


      chat_input.addEventListener('keypress', function(event) {
        // Check if Enter key was pressed
        if (event.key === 'Enter') {
            // Prevent the default action of the Enter key (which is usually submitting a form)
            event.preventDefault();
            // Trigger the click event of the send button
            chat_input_send.click();
        }
    });
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      localStorage.setItem('name', name)
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this
      if(parent.get_name() == null && message == null){
        return
      }

      db.ref('chats/').once('value', function(message_object) {
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index
        })
        .then(function(){
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      db.ref('chats/').on('value', function(messages_object) {
        chat_content_container.innerHTML = ''
        if(messages_object.numChildren() == 0){
          return
        }

        var messages = Object.values(messages_object.val());
        var guide = [] 
        var unordered = [] 
        var ordered = [] 

        for (var i, i = 0; i < messages.length; i++) {
          guide.push(i+1)
          unordered.push([messages[i], messages[i].index]);
        }

        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        ordered.forEach(function(data) {
          var name = data.name
          var message = data.message

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });

        chat_content_container.scrollTop = chat_content_container.scrollHeight;
    })

    }
  }
  // So we've "built" our app. Let's make it work!!
  var app = new EcoGuardianChat()
  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to home.
  if(app.get_name() != null){
    app.chat()
  }
}
