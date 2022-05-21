package com.hoby.solaitra.view;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.fragment.NavHostFragment;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationItemView;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.hoby.solaitra.R;
import com.hoby.solaitra.api.RetrofitAPI;
import com.hoby.solaitra.model.UserModel;

import static androidx.navigation.fragment.NavHostFragment.findNavController;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class MainActivity extends AppCompatActivity {

    EditText lastname;
    EditText firstname;
    EditText sex;
    EditText pseudo;
    EditText password;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /*BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        NavController navController = Navigation.findNavController(this, R.id.fragment);
        NavigationUI.setupWithNavController(bottomNavigationView, navController);

        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(R.id.historiqueFragment, R.id.accueilFragment, R.id.parametresFragment).build();
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);*/
    }

    private void postData(UserModel newUser) {
        // on below line we are creating a retrofit
        // builder and passing our base url
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.88.20:3000/")
                // as we are sending data in json format so
                // we have to add Gson converter factory
                .addConverterFactory(GsonConverterFactory.create())
                // at last we are building our retrofit builder.
                .build();
        // below line is to create an instance for our retrofit api class.
        RetrofitAPI retrofitAPI = retrofit.create(RetrofitAPI.class);
        // calling a method to create a post and passing our modal class.
        Call<UserModel> call = retrofitAPI.createPost(newUser);

        // on below line we are executing our method.
        call.enqueue(new Callback<UserModel>() {
            @Override
            public void onResponse(Call<UserModel> call, Response<UserModel> response) {
                // this method is called when we get response from our api.
                Toast.makeText(MainActivity.this, "Data added to API", Toast.LENGTH_SHORT).show();
                // on below line we are setting empty text
                // to our both edit text.
                lastname.setText("");
                firstname.setText("");
                sex.setText("");
                pseudo.setText("");
                password.setText("");

                // we are getting response from our body
                // and passing it to our modal class.
                UserModel responseFromAPI = response.body();

                // on below line we are getting our data from modal class and adding it to our string.
            }

            @Override
            public void onFailure(Call<UserModel> call, Throwable t) {
                // setting text to our text view when
                // we get error response from API.
                System.out.println("Error " + t.getMessage());
                Toast.makeText(MainActivity.this, "Error : " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
    public void signIn(View view)
    {
        Toast.makeText(getApplicationContext(),"Button is clicked",Toast.LENGTH_LONG).show();

        lastname = (EditText)findViewById(R.id.lastname);
        firstname = (EditText)findViewById(R.id.firstname);
        sex = (EditText)findViewById(R.id.sex);
        pseudo = (EditText)findViewById(R.id.pseudo);
        password = (EditText)findViewById(R.id.password);
        System.out.println("Last name : " + lastname.getText().toString());
        System.out.println("First name : " + firstname.getText().toString());
        System.out.println("Sex : " + sex.getText().toString());
        System.out.println("Pseudo : " + pseudo.getText().toString());
        System.out.println("Password : " + password.getText().toString());
        String lastnameVal = lastname.getText().toString();
        String firstnameVal = firstname.getText().toString();
        String sexVal = sex.getText().toString();
        String pseudoVal = pseudo.getText().toString();
        String passwordVal = password.getText().toString();
        UserModel newUser = new UserModel(lastnameVal, firstnameVal, sexVal, pseudoVal, passwordVal);
        this.postData(newUser);
    }
}