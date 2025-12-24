let fbReady = false;

window.fbAsyncInit = function () {
  FB.init({
    appId: '1528637581521556',
    cookie: true,
    xfbml: false,
    version: 'v19.0'
  });

  fbReady = true;
  document.getElementById('loginBtn').disabled = false;

  // Auto-check login status
  FB.getLoginStatus(response => {
    if (response.status === 'connected') {
      fetchUserData();
    }
  });
};

// LOGIN
document.getElementById('loginBtn').addEventListener('click', () => {
  if (!fbReady) return;

  FB.login(response => {
    if (response.authResponse) {
      fetchUserData();
    }
  }, {
    scope: 'public_profile,email'
  });
});

// FETCH USER DATA
function fetchUserData() {
  FB.api('/me', { fields: 'name,email,picture.width(200)' }, user => {
    document.getElementById('loginBtn').style.display = 'none';
    document.querySelector('.hint').style.display = 'none';
    document.getElementById('profile').classList.remove('hidden');

    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent =
      user.email || 'No email available';
    document.getElementById('profilePic').src = user.picture.data.url;
  });
}

// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', () => {
  FB.logout(() => {
    location.reload();
  });
});
