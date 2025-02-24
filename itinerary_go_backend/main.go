package main

import (
	"context"
	"encoding/json"
	"fmt"

	// "log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
)

type ItineraryRequest struct {
	Destination string `json:"destination"`
	Duration    int    `json:"duration"`
	Preferences string `json:"preferences"`
}

type ItineraryResponse struct {
	Itinerary string `json:"itinerary"`
}

func generateItinerary(destination string, duration int, preferences string) (string, error) {
	// Load the .env file
	err := godotenv.Load()
	if err != nil {
		return "", fmt.Errorf("error loading .env file: %v", err)
	}

	// Fetch the OpenAI API key from the environment
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("OPENAI_API_KEY not found in .env file")
	}

	// Create the OpenAI client
	client := openai.NewClient(apiKey)

	// Generate the prompt
	prompt := fmt.Sprintf("Create a %d-day itinerary for %s with preferences: %s", duration, destination, preferences)

	// Call the OpenAI API
	// resp, err := client.CreateCompletion(
	// 	context.Background(),
	// 	openai.CompletionRequest{
	// 		Model:     "gpt-4o-mini",
	// 		Prompt:    prompt,
	// 		MaxTokens: 500,
	// 	},
	// )

	// resp, err := client.CreateChatCompletion(
	// 	context.Background(),
	// 	openai.ChatCompletionRequest{
	// 		Model: "gpt-4o-mini",
	// 		Messages: []openai.ChatCompletionMessage{
	// 			{Role: "system", Content: "You are a helpful assistant."},
	// 			{Role: "user", Content: "Write a haiku about recursion in programming."},
	// 		},
	// 	},
	// )

	// Call the OpenAI API using CreateChatCompletion
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4, // Use GPT-4 or GPT-4-turbo
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
			MaxTokens: 1000,
		},
	)
	if err != nil {
		return "", fmt.Errorf("error calling OpenAI API: %v", err)
	}

	return strings.TrimSpace(resp.Choices[0].Message.Content), nil
}

func itineraryHandler(w http.ResponseWriter, r *http.Request) {
	var request ItineraryRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	itinerary, err := generateItinerary(request.Destination, request.Duration, request.Preferences)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to generate itinerary: %v", err), http.StatusInternalServerError)
		return
	}

	response := ItineraryResponse{Itinerary: itinerary}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/generate-itinerary", itineraryHandler)
	fmt.Println("Go service running on http://localhost:8081")
	http.ListenAndServe(":8081", nil)
}
