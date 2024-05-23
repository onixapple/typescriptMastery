//testing TS 5.4 features

function getUrls(url: string | URL, names: string[]) {
    if (typeof url === "string") {
        url = new URL(url);
    }
    return names.map(name => {
        url.searchParams.set("name", name)
        // Property 'searchParams' does not exist on type 'string | URL'.
        // The problem was fixed in TS 5.4
        return url.toString();
    });
}

const names : string[] = ["Adidas", "Nike", "Reebok"]
//no need to specify the type of array, as it is infered from function
const array = getUrls("http://localShop.net", names)

console.log(array)

function printValueLater(value: string | undefined) {
    if (value === undefined) {
        value = "missing!";
    }
    /*setTimeout(() => {
        reasigning the value, or changing it in a way that doesnt afect its type, will invalidate the future use of it
        value = value;
    }, 500);*/
    setTimeout(() => {
        console.log(value.toUpperCase());
        //in this case value is of type string. TS understands that if it was not undefined, it will be a string, unless we reasign it again without a type check
    }, 1000);
}

//----------------------------------------------------------------------------------------------

// No Infer Type, added in 5.4 
// Lets say we take as parametres an array of fruits, and a string representing a default value. At that point, if the default value wont be found in the array,
// TS will infer it, and it will be added as options. 

//Bad

function getGroceries<C extends string>(fruits: C[], defaultFruit?: C) {
    // ...
}
getGroceries(["apple", "pear", "banana"], "kiwi");
//When we call the above function, getGroceries<"apple" | "pear" | "banana" | "kiwi"> we will have the following as options, but we dont want kiwi, cause it is not from the original array

//Good

function getGroceries2<C extends string, D extends C>(fruits: C[], defaultFruit?: D) {
    // ...
}
getGroceries2(["apple", "pear", "banana"], "kiwi"); //in the following case, we have an error, as type D is not included in C
// The main problem would be that type D wont be used anywhere else, so its just extra types.


//Best
function getGroceries3<C extends string>(fruits: C[], defaultFruit?: NoInfer<C>) {
    // ...
}
getGroceries3(["apple", "pear", "banana"], "kiwi"); // In the following case, we know that the default value will take only one of the array's value
//defaultFruit?: "apple" | "pear" | "banana" | undefined  // getGroceries3<"apple" | "pear" | "banana">


//--------------------------------------------------------------
//JS 's OBJECT.GroupBy and Map.GroupBy

const newArray: number[] = [0, 1, 2, 3, 4, 5];
const myObj = Object.groupBy(array, (num: number, index: number) => {
    return num % 2 === 0 ? "even": "odd";
});