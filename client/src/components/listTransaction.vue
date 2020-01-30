<template>
            <div class="question-summary border-bottom pt-3 pb-3">
              <div class="row">
                <div class="points col-3">
                  <div class="votes mr-1">
                    <div class="mini-counts">
                      <span>{{transaction.quantity}}</span>
                      <p>Qyt</p>
                    </div>
                  </div>
                </div>
                <div class="summary col-9 text-left">
                  <div class="question-hyperlink d-inline-block text-truncate">{{transaction.item.name}}</div>
                  <p style="color:black">Total = Rp {{transaction.item.price * transaction.quantity}}</p>
                  <div class="created">
                    <div class="by-user">
                      <p class="date">Created 20-1-2020 / Pembeli :<span class="name"> {{transaction.customer}}</span></p>
                    </div>
                  </div>
                </div>
              </div>              
            </div>    
</template>

<script>


export default {
    name: 'transaction',
    props:['transaction']
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-bar {
  min-height: 40rem;
}
.headline {
  font-weight: 400;
  font-size: 2.07692308rem;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.question-hyperlink {
  color: #0064bd;
  font-size: 18px;
  max-width: 600px;
}
.question-hyperlink:hover {
  text-decoration: none;
  color: #0095ff;
}
.tags {
  margin-top: .2rem;
}
.tags .badge {
  margin-left: .5rem;
}
.badge {
  padding: .4em .5em;
}
.badge-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
}
.points {
  text-align: center;
}
.votes {
  height: 65px;
  width: 65px;
  min-width: 65px;
  font-size: 14px;
  color: #848d95;
  padding: 7px 6px;
  text-align: center;
  display: inline-block;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
}
.votes span {
  font-weight: 700;
  font-size: 18px;
}
.by-user .date {
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 12px;
  color: #9199a1;
}
.by-user .name {
  color: #0077cc;
}
</style>