package com.athenianMarketplace.dev.Responses;

public class ServerResponse {
    public int error;
    public String data;
    public ServerResponse(int error, String data){
        this.error = error;
        this.data = data;
    }
}
