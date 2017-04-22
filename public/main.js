document.querySelector('#todo-list').addEventListener('click', function(e) {
  if (e.target.matches('input')) {
    fetch('todo', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          'index': e.target.parentElement.attributes[1].nodeValue,
        'name': e.srcElement.dataset.name,
        'done': e.srcElement.dataset.done.toLowerCase() === 'true'
      })
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      console.log(data)
      window.location.reload(true)
    })
  }

  else if (e.target.matches('p.delete-button')) {
    fetch('todo', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'index': e.target.parentElement.attributes[1].nodeValue,
          'name': e.target.dataset.name
        })
    }).then(res => {
        if (res.ok) return res.json()
    }).then(data => {
        console.log(data)
        window.location.reload(true)
    })
  }
  else return;
})