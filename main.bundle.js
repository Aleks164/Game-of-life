(()=>{"use strict";function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var i=t((function e(t,i,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),e.stepDurationMs=n,e.gameField=t,e.gameView=i;var a,l,r=e.gameField.getState();e.gameView.updateGameField(r),e.gameView.updateGameState({width:r[0].length,height:r.length,isRunning:!1}),e.gameView.onCellClick((function(t,i){r=e.gameField.getState(),e.gameField.toggleCellState(t,i),e.gameView.updateGameField(r)})),e.gameView.onFieldSizeChange((function(t,i){a=t,l=i,t>20&&(a=20),t<5&&(a=5),i>20&&(l=20),i<5&&(l=5),e.width=a,e.height=l,e.gameField.setSize(a,l),r=e.gameField.getState(),e.gameView.updateGameField(r),e.gameView.updateGameState({width:r[0].length,height:r.length})})),e.gameView.onGameStateChange((function(t){e.gameView.updateGameState({width:r[0].length,height:r.length,isRunning:t}),e.gameView.isRunning=t,e.isRunning=t,e.gameView.isRunning?e.timerId=setInterval((function(){e.gameView.count+=1,e.gameField.nextGeneration(),r=e.gameField.getState(),e.gameView.updateGameField(r),e.gameField.afterNextGeneration();var i=e.gameField.afternextStepField;e.gameView.nextStepGameField(i);var n=!0;r.forEach((function(t){t.includes(1)&&(n=!1,e.gameView.changeCondition("struggle for life"))})),n&&e.gameView.changeCondition("all cells is dead"),!0===e.gameField.bothStepsAreEqual&&(n=!0,e.gameView.changeCondition("these are immortal cells"),e.gameField.bothStepsAreEqual=!1),e.gameView.counter(e.gameView.count,t,n)}),e.stepDurationMs):(clearInterval(e.timerId),r=e.gameField.getState(),e.gameView.updateGameField(r))})),e.gameView.onStapeChange((function(t){e.stepDurationMs=t}))}));function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var r=function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;n(this,e),l(this,"bothStepsAreEqual",!1),this.width=i,this.height=a;var r=Array.from(Array(this.height),(function(){return 1===a?[]:Array(t.width).fill(0)}));this.result=r,this.nextStepField=r,this.afternextStepField=r}var t,i;return t=e,(i=[{key:"getState",value:function(){return this.result}},{key:"check",value:function(e,t){return e<0||e>this.height-1||t<0||t>this.width-1?0:this.result[e][t]}},{key:"nextStepCheck",value:function(e,t){return e<0||e>this.height-1||t<0||t>this.width-1?0:this.nextStepField[e][t]}},{key:"toggleCellState",value:function(e,t){this.result[t][e]=0===this.result[t][e]?1:0}},{key:"setSize",value:function(e,t){this.width=e,this.height=t;var i=this.getState(),n=i.length-t;function a(){for(var n=0;n<t;n++){var a=i[n].length-e;if(i[n].length<e)for(var l=0;l<Math.abs(a);l++)i[n].push(0);if(i[n].length>e)for(var r=0;r<Math.abs(a);r++)i[n].pop()}}function l(){if(i.length<t)for(var a=0;a<Math.abs(n);a++)i.push(Array(e).fill(0));if(i.length>t)for(var l=0;l<Math.abs(n);l++)i.pop()}i.length<t?(l(),a()):(a(),l())}},{key:"nextGeneration",value:function(){this.nextStepField=this.result.slice(0);for(var e=0;e<this.height;e++){this.nextStepField[e]=this.nextStepField[e].slice(0);for(var t=0;t<this.width;t++){var i=this.check(e-1,t-1)+this.check(e,t-1)+this.check(e+1,t-1)+this.check(e+1,t)+this.check(e+1,t+1)+this.check(e,t+1)+this.check(e-1,t+1)+this.check(e-1,t);0===this.result[e][t]&&3===i?this.nextStepField[e][t]=1:i>3||1!==this.nextStepField[e][t]||2!==i&&3!==i?this.nextStepField[e][t]=0:this.nextStepField[e][t]=1}}for(var n=!0,a=0;a<this.height&&!1!==n;a++)for(var l=0;l<this.width;l++)if(this.result[a][l]!==this.nextStepField[a][l]){n=!1;break}n&&(this.bothStepsAreEqual=!0),n||(this.result=this.nextStepField)}},{key:"afterNextGeneration",value:function(){this.afternextStepField=this.nextStepField.slice(0);for(var e=0;e<this.height;e++){this.afternextStepField[e]=this.afternextStepField[e].slice(0);for(var t=0;t<this.width;t++){var i=this.nextStepCheck(e-1,t-1)+this.nextStepCheck(e,t-1)+this.nextStepCheck(e+1,t-1)+this.nextStepCheck(e+1,t)+this.nextStepCheck(e+1,t+1)+this.nextStepCheck(e,t+1)+this.nextStepCheck(e-1,t+1)+this.nextStepCheck(e-1,t);0===this.nextStepField[e][t]&&3===i?this.afternextStepField[e][t]=1:i>3||1!==this.nextStepField[e][t]||2!==i&&3!==i?this.afternextStepField[e][t]=0:this.afternextStepField[e][t]=1}}}}])&&a(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var h=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,"isRunning",!1),u(this,"count",0);var i=document.createElement("div"),n=document.createElement("div");!function(){i.classList.add("gameField"),n.classList.add("gameControls");var e=document.createElement("INPUT"),a=document.createElement("INPUT"),l=document.createElement("div"),r=document.createElement("INPUT"),s=document.createElement("div"),u=document.createElement("div"),h=document.createElement("div"),c=document.createElement("label"),o=document.createElement("label"),d=document.createElement("label"),g=document.createElement("label"),m=document.createElement("Condition");e.setAttribute("type","number"),a.setAttribute("type","number"),r.setAttribute("type","range"),r.setAttribute("value","1"),r.setAttribute("min","0.5"),r.setAttribute("max","5"),r.setAttribute("step","0.5"),e.setAttribute("min","5"),e.setAttribute("max","20"),a.setAttribute("min","5"),a.setAttribute("max","20"),e.classList.add("field-size","field-size--width"),a.classList.add("field-size","field-size--height"),d.classList.add("labelForrange"),g.classList.add("labelCounter"),m.classList.add("labelCondition"),r.classList.add("range"),l.classList.add("run-button","run-button--stopped"),g.innerHTML="Step 0",l.innerHTML="Play",m.innerHTML="Condition is: waiting for srart ",c.innerHTML="Width",o.innerHTML="Height",d.innerHTML="Step duration 1 sec",s.append(c,e),u.append(o,a),h.append(d,r),n.append(s,u,h,l,m,g),t.append(n,i),document.body.appendChild(t)}(),this.el=t,this.gameField=i,this.gameControls=n,this.count=0}var t,i;return t=e,(i=[{key:"updateGameField",value:function(t){this.gameField.innerHTML="",e.table=document.createElement("table"),e.table.classList.add("table"),t.forEach((function(i,n){var a=document.createElement("tr");i.forEach((function(e,t){var i=document.createElement("td");i.classList.add("cell"),i.classList.add(0===e?"cell--dead":"cell--alive"),i.dataset.x=String(t),i.dataset.y=String(n),a.append(i)})),e.field=t,e.table.append(a)})),this.gameField.append(e.table)}},{key:"nextStepGameField",value:function(e){this.el.querySelectorAll(".cell--alive").forEach((function(t){"string"==typeof t.dataset.y&&"string"==typeof t.dataset.x&&0===e[+t.dataset.y][+t.dataset.x]&&(t.classList.remove("cell--alive"),t.classList.add("cell--deadInNextStep"))}))}},{key:"updateGameState",value:function(e){var t=this.el.querySelector(".run-button"),i=this.el.querySelector(".field-size--width"),n=this.el.querySelector(".field-size--height");t&&i&&n&&(i.setAttribute("value",String(e.width)),n.setAttribute("value",String(e.height)),e.isRunning?(this.isRunning=!0,t.classList.remove("run-button--stopped"),t.classList.add("run-button--runned"),t.innerHTML="Stop"):(this.isRunning=!1,t.classList.add("run-button--stopped"),t.classList.remove("run-button--runned"),t.innerHTML="Play"))}},{key:"onCellClick",value:function(e){var t=this.el.querySelector(".gameField");null!==t&&t.addEventListener("click",(function(t){var i=t.target;if(i){var n=Number(i.dataset.x),a=Number(i.dataset.y);n>=0&&a>=0&&e(n,a)}}))}},{key:"onGameStateChange",value:function(e){var t=this.el.querySelector(".run-button"),i=this;null!==t&&t.addEventListener("click",(function(){var t=!i.isRunning;e(t)}))}},{key:"onFieldSizeChange",value:function(t){var i=this.el.querySelector(".field-size--width"),n=this.el.querySelector(".field-size--height"),a=this.el.querySelector(".run-button"),l=this;null!==i&&null!==n&&null!==a&&(i.addEventListener("change",(function(){l.isRunning?(l.isRunning&&a.dispatchEvent(new Event("click")),e.height=Number(n.value),e.width=Number(i.value),t(e.width,e.height),l.isRunning||null===a||a.dispatchEvent(new Event("click"))):(e.height=Number(n.value),e.width=Number(i.value),t(e.width,e.height))})),n.addEventListener("change",(function(){l.isRunning?(l.isRunning&&a.dispatchEvent(new Event("click")),e.height=Number(n.value),e.width=Number(i.value),t(e.width,e.height),l.isRunning||null===a||a.dispatchEvent(new Event("click"))):(e.height=Number(n.value),e.width=Number(i.value),t(e.width,e.height))})))}},{key:"onStapeChange",value:function(e){var t=this.el.querySelector(".range"),i=this.el.querySelector(".labelForrange"),n=this.el.querySelector(".run-button");null!==t&&null!==i&&null!==n&&t.addEventListener("change",(function(){n.dispatchEvent(new Event("click"));var a=Number(t.value),l=1e3*a;i.innerHTML="Step duration ".concat(a," sec "),e(l),n.dispatchEvent(new Event("click"))}))}},{key:"counter",value:function(e,t,i){var n=this.el.querySelector(".labelCounter"),a=this.el.querySelector(".run-button");null!==n&&null!==a&&(n.innerHTML="Step ".concat(e),t&&i&&(this.count=0,a.dispatchEvent(new Event("click"))))}},{key:"changeCondition",value:function(e){var t=this.el.querySelector(".labelCondition");null!==t&&(t.innerHTML="Condition is: ".concat(e," "))}}])&&s(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}())(document.getElementById("app"));new i(new r(5,5),h,1e3)})();