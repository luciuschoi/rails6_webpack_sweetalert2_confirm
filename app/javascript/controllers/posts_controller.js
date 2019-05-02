import { Controller } from 'stimulus'
import Swal from 'sweetalert2'


export default class extends Controller {
  confirm(event) {
    event.preventDefault();
    let originLink = event.target.href
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let promise = $.ajax({
          type: 'DELETE',
          url: 'x' + originLink + '.json'
        })  
        
        promise.fail(cancelFunc)
        promise.done(confirmFunc)

        function confirmFunc(){
          $(`#${event.target.closest('tr').id}`).slideUp('slow')
          Swal.fire("deleted")
        }
        function cancelFunc(){
          Swal.fire("fail")
        }
      }
    })
  }
}

// https://epthffh.tistory.com/entry/promise-%ED%8C%A8%ED%84%B4-%EC%98%88%EC%A0%9C