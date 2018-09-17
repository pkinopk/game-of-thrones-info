import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikiControlService {
  constructor(private http: HttpClient) {}

  baseURL = 'https://pkinopk-server.herokuapp.com/got-wiki';
  charactersList = [];
  showSearchList = true;
  showDetails = false;
  showEdit = false;
  name: string;
  selectedCharacter: Character;
  isNew = true;
  formCheck = {
    fName: false,
    gender: false,
    origin: false,
    family: false,
    pictureURL: false,
    death: false
  };
  formBinding: Character = new Character(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  );

  getCharactersList(): Promise<any> {
    const request = this.http
      .request(new HttpRequest('GET', this.baseURL + '/characterlist/'))
      .toPromise()
      .catch(reason => {
        return reason;
      })
      .then((response: any) => {
        console.log(response.body);
        return response;
      });
    return request;
  }

  onStart() {
    this.getCharactersList()
      .then((response: any) => {
        this.charactersList = response.body;
        return response.body;
      })
      .catch(() => {});
  }

  displayInfo(character) {
    this.name = '';
    this.showSearchList = false;
    this.showDetails = true;
    this.selectedCharacter = character;
  }

  disableDisplayCharacter() {
    this.name = '';
    this.showSearchList = true;
    this.showDetails = false;
    this.selectedCharacter = null;
    this.showEdit = false;
    this.clearForm();
  }

  findCharacter(char) {
    if (char) {
      if (this.name) {
        const n = char.toLowerCase().search(this.name.toLowerCase());
        return n !== -1 ? 1 : 0;
      } else {
        return 0;
      }
    }
  }

  clearForm() {
    this.formBinding.firstName = '';
    this.formBinding.lastName = '';
    this.formBinding.title = '';
    this.formBinding.status = '';
    this.formBinding.death = '';
    this.formBinding.age = '';
    this.formBinding.origin = '';
    this.formBinding.gender = '';
    this.formBinding.family = '';
    this.formBinding.pictureURL = '';
  }

  editCharacter(character) {
    this.isNew = false;
    this.showDetails = false;
    this.showEdit = true;

    this.formBinding.firstName = character.firstName;
    this.formBinding.lastName = character.lastName;
    this.formBinding.title = character.title.join(', ');
    this.formBinding.status = character.status;
    this.formBinding.death = character.death;
    this.formBinding.age = character.age;
    this.formBinding.origin = character.origin;
    this.formBinding.gender = character.gender;
    this.formBinding.family = character.family;
    this.formBinding.pictureURL = character.pictureURL;
  }

  newCharacter() {
    this.showSearchList = false;
    this.showDetails = false;
    this.showEdit = !this.showEdit;
    this.isNew = true;
    this.formBinding.status = 'Status';
    this.formBinding.gender = 'Gender';
    this.formBinding.family = 'Family';
  }

  saveCharacter() {
    this.clearFormValidation();
    const character = this.createCharacter();

    if (!this.formValidation(character)) {
      this.http
        .post(this.baseURL + '/addcharacter', character)
        .toPromise()
        .catch(reason => {
          console.log('recipe failed', reason);
        })
        .then((response: any) => {
          console.log('response', response);
          this.onStart();
        });
      this.showEdit = !this.showEdit;
      this.displayInfo(character);
    }
  }

  updateCharacter() {
    this.clearFormValidation();
    const character = this.createCharacter();

    const id = this.charactersList.findIndex(function(element) {
      return character.fullName === element.fullName;
    });

    if (!this.formValidation(character)) {
      this.http
        .put(this.baseURL + '/updatecharacter/' + id, character)
        .toPromise()
        .catch(reason => {
          console.log('update failed', reason);
        })
        .then((response: any) => {
          console.log('response', response);
          this.onStart();
        });
      this.showEdit = !this.showEdit;
      this.displayInfo(character);
    }
  }

  deleteCharacter(id) {
    console.log(id);
    this.http
      .delete(this.baseURL + '/deleterecipe/' + id)
      .toPromise()
      .catch(reason => {
        console.log('recipe failed', reason);
      })
      .then((response: any) => {
        console.log('response', response);
        this.onStart();
      });
  }

  setTitles(string) {
    const titles = [];
    const temp = string.trim().split(',');
    for (const title of temp) {
      titles.push(title.trim());
    }
    return titles;
  }

  createCharacter() {
    const character = new Character(
      this.formBinding.firstName,
      this.formBinding.lastName,
      this.setTitles(this.formBinding.title),
      this.formBinding.status,
      this.formBinding.death,
      this.formBinding.age,
      this.formBinding.origin,
      this.formBinding.gender,
      this.formBinding.family,
      this.formBinding.pictureURL
    );
    return character;
  }
  formValidation(character) {
    let needFix = false;
    if (character.firstName === '') {
      $('#fname').removeClass('hidden');
      needFix = true;
    }
    if (character.gender === 'Gender') {
      $('#gender').removeClass('hidden');
      needFix = true;
    }
    if (character.origin === '') {
      $('#origin').removeClass('hidden');
      needFix = true;
    }
    if (character.family === 'Family') {
      $('#family').removeClass('hidden');
      needFix = true;
    }
    if (character.pictureURL === '') {
      $('#pictureURL').removeClass('hidden');
      needFix = true;
    }
    if (character.status === 'Status') {
      $('#status').removeClass('hidden');
      needFix = true;
    }
    if (character.status === 'Deceased' && character.death === '') {
      $('#death').removeClass('hidden');
      needFix = true;
    }
    return needFix;
  }
  clearFormValidation() {
    $('small').addClass('hidden');
  }
}

// Character class
class Character {
  fullName;
  constructor(
    public firstName,
    public lastName,
    public title,
    public status,
    public death,
    public age,
    public origin,
    public gender,
    public family,
    public pictureURL
  ) {
    this.fullName = `${firstName} ${lastName}`.trim();
  }
}
