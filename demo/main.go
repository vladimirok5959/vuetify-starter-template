package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type User struct {
	UserName  string `json:"UserName"`
	UserEmail string `json:"UserEmail"`
}

func main() {
	http.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
		Render(User{
			UserName:  "Sandra Adams",
			UserEmail: "sandra@gmail.com",
		}, w, r)
	})

	http.ListenAndServe(":8080", nil)
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
