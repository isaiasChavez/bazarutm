import ErrorHelper from '../../helpers/error.helper'
import {HTTPResponses} from '../../types'

export class Service {
 protected eH: ErrorHelper
 protected HTTPResponses = HTTPResponses
 constructor(){
     this.eH = new ErrorHelper(this)
 }
}

export class Controller {
 protected eH: ErrorHelper
 protected HTTPResponses = HTTPResponses

 constructor(){
     this.eH = new ErrorHelper(this)
 }

 

}
