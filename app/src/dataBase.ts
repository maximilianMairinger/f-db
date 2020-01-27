import { Data, DataSubscription, DataCollection, DataSet } from "./data"
import { nthIndex } from "./helper"

const entireDataBaseFunction = DataBaseFunction.toString(); 
const paramsOfDataBaseFunction = entireDataBaseFunction.slice(entireDataBaseFunction.indexOf("(") + 1, nthIndex(entireDataBaseFunction, ")", 1));
const bodyOfDataBaseFunction = entireDataBaseFunction.slice(entireDataBaseFunction.indexOf("{") + 1, entireDataBaseFunction.lastIndexOf("}"));



class InternalDataBase<Store extends object, Matcher, Class extends JSONMatcherClass<Matcher>, ExtendedStore extends JSONMatch<Store, Matcher, Class>> extends Function {
  private t: any
  constructor(store: Store, match: Matcher, jsonMatcherClass: Class) {
    super(paramsOfDataBaseFunction, bodyOfDataBaseFunction)
    this.t = this.bind(this)

    this.t.rawStore = store
    this.t.match = match
    this.t.jsonMatcherClass = jsonMatcherClass

    // TODO: ExtendedStore in runtime

    
    this.initData()

    

    return this.t
  }

  public change() {
    const t = this.t
    for (let key in t) {
      t[key]
    }
  }

  private initData() {
    const t = this.t
    const data = t.data
    for (const key in data) {
      const val = data[key]
      if (typeof val === objectString) t[key] = new InternalDataBase(val, t.match, t.jsonMatcherClass)
      else t[key] = new Data(val)
    }
  }
}


const objectString: "object" = "object"


type PrimitivePathSegment = string | number
type PathSegment = PrimitivePathSegment | Data<[PrimitivePathSegment]>
type ComplexData = {[key: string]: any} | any[]

function DataBaseFunction(...paths: PathSegment[])
function DataBaseFunction(data: ComplexData)
function DataBaseFunction(path_data?: PathSegment | ComplexData, ...paths: PathSegment[]) {


  console.log(this.t.data)
}


class JSONMatcher<Matcher, Class extends JSONMatcherClass<Matcher>> {
  constructor(public matcher: Matcher, public cls: Class) {

  }
}

class JSONMatcherClass<Matcher> {
  constructor(protected data: Matcher) {

  }
}

type FunctionProperties = "apply" | "call" | "caller" | "bind" | "arguments" | "length" | "prototype" | "name" | "toString"
type OmitFunctionProperties<Func extends Function> = Func & Record<FunctionProperties, never>
type DataBaseify<Type extends object, Matcher, Class extends JSONMatcherClass<Matcher>> = { 
  [Key in keyof Type]: Type[Key] extends object ? DataBase<Type[Key], Matcher, Class> : Data<Type[Key]>
}

type DataBase<Type extends object, Matcher, Class extends JSONMatcherClass<Matcher>> = OmitFunctionProperties<Function> & DataBaseify<Type, Matcher, Class> & JSONMatcher<Matcher, Class>
//@ts-ignore
export const DataBase = InternalDataBase as { new<Type extends object>(data: Type): DataBase<Type> }


type JSONMatch<Type extends object, Matcher, Class extends JSONMatcherClass<Matcher>> = { 
  [Key in keyof Type]: Type[Key] extends Matcher ? Type[Key] extends object ? JSONMatch<Type[Key], Matcher, Class> & Class : Type[Key] & Class : Type[Key] extends object ? JSONMatch<Type[Key], Matcher, Class> : Type[Key]
}

class Test<Matcher> extends JSONMatcherClass<Matcher> {
  constructor(data: Matcher) {
    super(data)
  }
  ok() {
    return this.data
  }
}

