package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type httpHandleFunc func(http.ResponseWriter, *http.Request)

type ListOfStrings []string

func (l ListOfStrings) Contains(s string) bool {
	for _, v := range l {
		if v == s {
			return true
		}
	}
	return false
}

type User struct {
	UserName  string `json:"userName"`
	UserEmail string `json:"userEmail"`
}

type TableRow struct {
	Name     string `json:"name"`
	Calories int    `json:"calories"`
}

func main() {
	http.HandleFunc("/user", Headers(func(w http.ResponseWriter, r *http.Request) {
		Render(User{
			UserName:  "Sandra Adams",
			UserEmail: "sandra@gmail.com",
		}, w, r)
	}))

	http.HandleFunc("/table", Headers(func(w http.ResponseWriter, r *http.Request) {
		Render([]TableRow{
			{"Frozen Yogurt", 159},
			{"Ice cream sandwich", 237},
			{"Eclair", 262},
			{"Cupcake", 305},
			{"Gingerbread", 356},
			{"Jelly bean", 375},
			{"Lollipop", 392},
			{"Honeycomb", 408},
			{"Donut", 452},
			{"KitKat", 518},
		}, w, r)
	}))

	http.ListenAndServe(":8080", nil)
}

func Headers(handler httpHandleFunc) httpHandleFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if ListOfStrings([]string{
			"http://localhost:3000",
			"https://localhost:3000",
		}).Contains(origin) {
			w.Header().Set(
				"Access-Control-Allow-Origin",
				"http://localhost:3000",
			)
			w.Header().Set(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept",
			)
		}
		if handler != nil {
			handler(w, r)
		}
	}
}

func Render(a interface{}, w http.ResponseWriter, r *http.Request) {
	b, err := json.Marshal(a)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	io.WriteString(w, string(b))
}
