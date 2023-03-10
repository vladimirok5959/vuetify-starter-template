default: debug

clean:
	go clean -testcache ./...

debug:
	go run ./main.go

lint:
	golangci-lint run --disable=structcheck

test:
	go test ./...

tidy:
	go mod tidy

.PHONY: clean debug default lint test tidy
