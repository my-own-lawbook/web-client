import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import {DateTime} from "luxon";

await i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        supportedLngs: ["de", "en"],
        interpolation: {
            escapeValue: false
        },
        react: {
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ["br", "b"]
        },
        resources: {
            en: {
                translation: {
                    auth: {
                        error_banner: {
                            label: "An error occurred! Try to refresh the site."
                        },
                        login: {
                            card: {
                                title: "Log in",
                                description: "Log in now to access the website!",
                                confirm: "Log in",
                                signup_info: "Do not yet have an account? <1>Sign up.</1>"
                            }
                        },
                        signup: {
                            card: {
                                title: "Sign up",
                                description: "Create an account now to log in later!",
                                confirm: "Sign up"
                            },
                            login_text: "Already have an account? <1>Log in!</1>"
                        },
                        email_verify: {
                            success: "Your email has been verified. You will soon be redirected.",
                            card: {
                                title: "Verify your E-Mail",
                                description: "An email that contains a token was sent to the following email address:<1>{{email}}</1></2>To validate your email address, please enter the code below.<4>If you did not receive an email, try requesting a new email.",
                                confirm_button_label: "Submit",
                                request_new_button_label: "Request new email"
                            }
                        },
                        profile: {
                            card: {
                                title: "Set your profile",
                                description: "Tell us more about yourself by filling out the below form! The data will be publicly visible to other users on the platform.",
                                confirm_button_label: "Save"
                            }
                        }
                    },
                    home: {
                        sections: {
                            books: {
                                title: "Your Law Books",
                                description: {
                                    empty: "You don't seem to have access to any law-books at the moment. Create a book yourself or be invited to one!",
                                    existing: "Below is a list of all law-books that you have access to. To get a more detailed view of each book, click on it."
                                }
                            },
                            invitations: {
                                title: "Your Invitations",
                                description: {
                                    empty: "You currently do not have any open Invitations!",
                                    existing: "You have been invited to new law-books by another user. Click on one of the below items to view more information about them"
                                }
                            }
                        }
                    },
                    book: {
                        tabs: {
                            content: {
                                label: "Gesetze"
                            },
                            members: {
                                label: "Mitglieder"
                            },
                            invitations: {
                                label: "Einladungen"
                            },
                        },
                        detail: {
                            children_label: "{{member_count}} members, {{entry_count}} entries, {{section_count}} sections"
                        },
                        invitation: {
                            invite_button_label: "Create invitation",
                            empty_list: {
                                admin: {
                                    pre: "There are no invitations open at the moment. If you want to invite a user, ",
                                    action: "create a new invitation!",
                                    post: ""
                                },
                                generic: {
                                    pre: "There are no invitations open at the moment. If you want another user to be added, ask an administrator to send them an invitation!",
                                    action: "",
                                    post: ""
                                }
                            },
                            table: {
                                row_1: "Recipient",
                                row_2: "Author",
                                row_3: "Sent at",
                                row_3_value: "{{date, DATETIME_SHORT}}",
                                row_4: "Expires at",
                                row_4_value: "{{date, DATETIME_SHORT}}",
                                row_5: "Role",
                                row_6: "Message",
                                row_7: "Settings"
                            },
                            settings: {
                                revoke_label: "Revoke Invitation"
                            },
                            dialog: {
                                description: "You can invite another user to join this law-book by filling out below form. The user wil have to accept the invitation.",
                                form: {
                                    checkbox_message_label: "Add a message",
                                    checkbox_expiration_label: "Add an expiration date",
                                }
                            }
                        },
                        member: {
                            table: {
                                column_1: "Name",
                                column_2: "Username",
                                column_3: "Role",
                                column_4: "Settings",
                            },
                            settings: {
                                update_role_label: "Change role",
                                remove_label: "Remove member"
                            },
                            dialog: {
                                role: {
                                    title: "Change a role",
                                    description: "To change the role of a user, you need to select the new one below. <1/>Note: At least one admin per book is required.",
                                    confirm_button_label: "Confirm"
                                },
                                remove: {
                                    title: "Remove a member",
                                    description: "You are about to remove <1>{{user}}</1> from the book. If you want to add the user back to the book, you will have to send another invitation.",
                                    confirm_button_label: "Confirm"
                                }
                            }
                        },
                        content: {
                            create_entry_button_label: "Create entry",
                            entry_delete_dialog_type: "Entry",
                            section_delete_dialog_type: "Section",
                            empty_list: {
                                admin: {
                                    pre: "This book currently has no entries. ",
                                    action: "Create a new entry!",
                                    post: ""
                                },
                                generic: {
                                    pre: "This book currently has no entries. If you think there should be some, ask a moderator to add some!",
                                    action: "",
                                    post: ""
                                }
                            },
                            entry_dialog: {
                                create: {
                                    title: "Add entry",
                                    description: "An entry is a collection of rules to a specific topic. Assign the entry a name and a key to continue.",
                                    confirm_button_label: "Confirm"
                                },
                                update: {
                                    title: "Update entry",
                                    description: "Update the entry by adjusting the attributes below.",
                                    confirm_button_label: "Confirm"
                                }
                            },
                            section_dialog: {
                                submit_button_label: "Confirm",
                                create: {
                                    title: "Add section",
                                    description: "A section is a specific rule for a specific topic. Assign the section an index, name and fill out the content to proceed!"
                                },
                                update: {
                                    title: "Update section",
                                    description: "Update the section by adjusting the attributes below"
                                }
                            },
                            entry_menu: {
                                add_section_label: "Add section",
                                edit_label: "Edit entry",
                                delete_label: "Delete entry"
                            },
                            section_menu: {
                                edit_label: "Edit section",
                                delete_label: "Delete section"
                            }
                        }
                    },
                    components: {
                        app_bar: {
                            user: {
                                auth_label: "Logged in as:"
                            },
                            host: {
                                host_label: "Current host:"
                            },
                            logo: {
                                logo_alt: "MOL-Logo"
                            },
                            menu: {
                                profile_label: "Profile",
                                logout_label: "Log out",
                                logout_all_label: "Log out (all Devices)"
                            }
                        },
                        invitation_item: {
                            label: "<1>{{user}}</1> invited you to join <2>{{book}}</2>."
                        },
                        input: {
                            birthday: {
                                label: "Birthday"
                            },
                            email: {
                                label: "Email",
                                placeholder: "user@domain.com"
                            },
                            email_token: {
                                label: "Token",
                                placeholder: "570c53cd-e102-4287-ae38-e22e0ee73f23"
                            },
                            expiration: {
                                label: "Expiration date"
                            },
                            gender: {
                                label: "Gender"
                            },
                            invitation_message: {
                                label: "Message",
                                placeholder: "Hello there…"
                            },
                            member_role: {
                                label: "Role"
                            },
                            password: {
                                label: "Password",
                                placeholder: "••••••••"
                            },
                            first_name: {
                                label: "First name",
                                placeholder: "John"
                            },
                            last_name: {
                                label: "Last name",
                                placeholder: "Doe"
                            },
                            username: {
                                label: "Username",
                                placeholder: "user1234"
                            },
                            user: {
                                label: "User"
                            },
                            entry_name: {
                                label: "Entry name",
                                placeholder: "National banking act"
                            },
                            entry_key: {
                                label: "Entry key",
                                placeholder: "NBA"
                            },
                            section_index: {
                                label: "Number",
                                placeholder: "2",
                                prefix: "§"
                            },
                            section_name: {
                                label: "Section name",
                                placeholder: "Regulation on housing protocol"
                            },
                            section_content: {
                                label: "Section content"
                            }
                        },
                        dialog: {
                            invitation: {
                                title: "Invitation into \"{{name}}\"",
                                decline_button_label: "Decline",
                                accept_button_label: "Accept",
                                role_info: "Upon joining, you will be granted the <1>{{role}}</1> role in the organization.",
                                expiration_info: "This invitation will expire on <1>{{date, DATE_FULL}}, at {{time, TIME_SIMPLE}}</1>.",
                                base_info: "<1>{{author}}</1> invited you to join the law-book <1>\"{{book}}\"</1>:"
                            },
                            delete_confirmation: {
                                title: "Confirm deletion of {{type}}",
                                description: "You are about to delete <1>{{identifier}}</1>! This action is permanent and cannot be undone!",
                                confirm_button_label: "Confirm deletion"
                            }
                        }
                    },
                    validation: {
                        format: {
                            email: "Please enter a valid email address",
                            password: "A password must contain at least eight uppercase and lowercase letters, digits and special characters.",
                            profile_name: "A name can only contain letters and whitespaces.",
                            date_past: "Please select a date in the past",
                            date_future: "Please select a date in the future",
                            username: "A username must can only contain letters, digits and underscores and must be between 4 and 20 characters long.",
                            non_empty: {
                                generic: "Please enter a value",
                                gender: "Please select a gender",
                                user: "Please select a user"
                            }
                        },
                        context: {
                            user: {
                                invitation_present: "This user already has an open invitation to the book!"
                            },
                            auth: {
                                bad_credentials: "Bad credentials",
                                invalid_token: "The token is invalid or expired.",
                                email_taken: "Email is already registered",
                                username_taken: "Username is already taken"
                            },
                            entry: {
                                key_not_unique: "An entry with that key already exists in this book!"
                            },
                            section: {
                                index_not_unique: "A section with that index already exists in this entry!"
                            },
                            members: {
                                only_one_admin: "At least one admin per book is required!"
                            }
                        }
                    },
                    roles: {
                        admin: "Admin",
                        moderator: "Moderator",
                        member: "Member"
                    }
                }
            },
            de: {
                translation: {
                    auth: {
                        error_banner: {
                            label: "Ein Fehler ist aufgetreten. Bitte versuche, die Seite neu zu laden."
                        },
                        login: {
                            card: {
                                title: "Anmelden",
                                description: "Melde dich an um auf deinen Account Zugriff zu erhalten!",
                                confirm: "Anmelden",
                                signup_info: "Hast du noch kein Account? <1>Registriere dich.</1>"
                            }
                        },
                        signup: {
                            card: {
                                title: "Registrieren",
                                description: "Erstelle ein Account um dich später anzumelden!",
                                confirm: "Registrieren"
                            },
                            login_text: "Hast du schon einen Account? <1>Melde dich an!</1>"
                        },
                        email_verify: {
                            success: "Deine Email Addresse wurde bestätigt. Du wirst gleich weitergeleitet.",
                            card: {
                                title: "Email Addresse bestätigen",
                                description: "Eine Email mit einem Einmalpasswort wurde an diese Email Addresse verschickt:<1>{{email}}</1></2>Um die Addresse zu bestätige, gebe diesen den Code aus der Email unten ein.<4>Falls du keine Email erhalten hast, versuche, eine neue zu beantragen.",
                                confirm_button_label: "Abschicken",
                                request_new_button_label: "Email erneut senden"
                            }
                        },
                        profile: {
                            card: {
                                title: "Profil erstellen",
                                description: "Erzähle uns etwas mehr über dich! Die Daten werden jedem anderen Nutzer der Plattform frei zugänglich sein.",
                                confirm_button_label: "Bestätigen"
                            }
                        }
                    },
                    home: {
                        sections: {
                            books: {
                                title: "Deine Gesetzesbücher",
                                description: {
                                    empty: "Du scheint noch keinen Zugriff auf ein Gesetzesbuch zu haben! Erstelle eines, oder warte, bis jemand dich einlädt.",
                                    existing: "Hier siehst du eine Liste aller Gesetzesbücher auf die du Zugriff hast. Um ausführlichere infos zu sehen, klicke auf die entsprechende Karte."
                                }
                            },
                            invitations: {
                                title: "Deine Einladungen",
                                description: {
                                    empty: "Aktuell hast du keine ausstehenden Einladungen!",
                                    existing: "Du wurdest in ein oder mehrere Gesetzesbücher eingeladen! Klicke auf die Kacheln um sie anzunehmen oder abzulehnen."
                                }
                            }
                        }
                    },
                    book: {
                        tabs: {
                            content: {
                                label: "Gesetze"
                            },
                            members: {
                                label: "Mitglieder"
                            },
                            invitations: {
                                label: "Einladungen"
                            },
                        },
                        detail: {
                            children_label: "{{member_count}} Mitglieder, {{entry_count}} Gesetze, {{section_count}} Paragraphen"
                        },
                        invitation: {
                            invite_button_label: "Einladung erstellen",
                            empty_list: {
                                admin: {
                                    pre: "Aktuell sind keine ausstehenden Einladungen vorhanden. Wenn du einen Benutzer einladen willst, ",
                                    action: "erstelle eine neue Einladung!",
                                    post: ""
                                },
                                generic: {
                                    pre: "Aktuell sind keine ausstehenden Einladungen vorhanden. Wenn du willst dass ein Benutzer Teil dieses Gesetzbuches wird, bitte einen Administrator, ihn einzuladen.",
                                    action: "",
                                    post: ""
                                }
                            },
                            table: {
                                row_1: "Empfänger",
                                row_2: "Autor",
                                row_3: "Erstelldatum",
                                row_3_value: "{{date, DATETIME_SHORT}}",
                                row_4: "Ablaufdatum",
                                row_4_value: "{{date, DATETIME_SHORT}}",
                                row_5: "Rolle",
                                row_6: "Nachricht",
                                row_7: "Optionen"
                            },
                            settings: {
                                revoke_label: "Einladung zurückrufen"
                            },
                            dialog: {
                                description: "Du kannst einen Benutzer dazu einladen, diesem Gesetzesbuch beizutreten. Der Benutzer wird die Möglichkeit haben, die Einladung anzunehmen oder abzulehnen.",
                                form: {
                                    checkbox_message_label: "Benutzerdefinierte Nachricht hinzufügen",
                                    checkbox_expiration_label: "Ablaufdatum hinzufügen",
                                }
                            }
                        },
                        member: {
                            table: {
                                column_1: "Name",
                                column_2: "Benutzername",
                                column_3: "Rolle",
                                column_4: "Optionen",
                            },
                            settings: {
                                update_role_label: "Rolle ändern",
                                remove_label: "Benutzer entfernen"
                            },
                            dialog: {
                                role: {
                                    title: "Rolle ändern",
                                    description: "Um die Rolle eines Benutzes zu ändern musst du die neue auswählen. <1/>Achtung: Mindestens ein Admin muss in einem Gesetzesbuch vorhanden sein.",
                                    confirm_button_label: "Bestätigen"
                                },
                                remove: {
                                    title: "Benutzer entfernen",
                                    description: "Der Benutzer <1>{{user}}</1> wird aus dem Gesetzesbuch entfernt. Wenn du ihn später wieder zu dem Buch hinzufügen willst, wirst du ihm erneut eine Einladung schicken müssen.",
                                    confirm_button_label: "Bestätigen"
                                }
                            }
                        },
                        content: {
                            create_entry_button_label: "Gesetz hinzufügen",
                            entry_delete_dialog_type: "Gesetz",
                            section_delete_dialog_type: "Paragraph",
                            empty_list: {
                                admin: {
                                    pre: "Dieses Gesetzbuch hat aktuell keine Gesetze. ",
                                    action: "Erstelle ein neues Gesetz!",
                                    post: ""
                                },
                                generic: {
                                    pre: "Dieses Gesetzbuch hat aktuell keine Gesetze. Wenn du denkst, dass es Gesetze geben sollte, bitte einen Moderator, welche hinzuzufügen.",
                                    action: "",
                                    post: ""
                                }
                            },
                            entry_dialog: {
                                create: {
                                    title: "Gesetz erstellen",
                                    description: "Ein Gesetz ist eine Sammlung von Paragraphen zu einem bestimmten Thema. Gebe dem Gesetz einen Namen und eine Kurzform um fortzufahren.",
                                    confirm_button_label: "Bestätigen"
                                },
                                update: {
                                    title: "Gesetz bearbeiten",
                                    description: "Bearbeite das Gesetz indem du die Werte unten veränderst.",
                                    confirm_button_label: "Bestätigen"
                                }
                            },
                            section_dialog: {
                                submit_button_label: "Bestätigen",
                                create: {
                                    title: "Paragraph hinzufügen",
                                    description: "Ein Paragraph ist eine Regel zu einem bestimmten Thema. Gebe dem Paragraph eine Zahl und Namen und gebe den Inhalt ein, um fortzufahren."
                                },
                                update: {
                                    title: "Paragraph barbeiten",
                                    description: "Bearbeite den Paragraphen indem du die Werte unten veränderst."
                                }
                            },
                            entry_menu: {
                                add_section_label: "Paragraph hinzufügen",
                                edit_label: "Gesetz bearbeiten",
                                delete_label: "Gesetz löschen"
                            },
                            section_menu: {
                                edit_label: "Paragraph bearbeiten",
                                delete_label: "Paragraph löschen"
                            }
                        }
                    },
                    components: {
                        app_bar: {
                            user: {
                                auth_label: "Angemeldet als:"
                            },
                            host: {
                                host_label: "Aktueller Server:"
                            },
                            logo: {
                                logo_alt: "MOL-Logo"
                            },
                            menu: {
                                profile_label: "Account",
                                logout_label: "Abmelden",
                                logout_all_label: "Überall abmelden"
                            }
                        },
                        invitation_item: {
                            label: "<1>{{user}}</1> hat dich in das Gesetzesbuch <1>{{book}}</1> eingeladen."
                        },
                        input: {
                            birthday: {
                                label: "Geburtstag"
                            },
                            email: {
                                label: "Email",
                                placeholder: "benutzer@server.com"
                            },
                            email_token: {
                                label: "Einmalpasswort",
                                placeholder: "570c53cd-e102-4287-ae38-e22e0ee73f23"
                            },
                            expiration: {
                                label: "Ablaufdatum"
                            },
                            gender: {
                                label: "Geschlecht"
                            },
                            invitation_message: {
                                label: "Nachricht",
                                placeholder: "Guten Tag…"
                            },
                            member_role: {
                                label: "Rolle"
                            },
                            password: {
                                label: "Passwort",
                                placeholder: "••••••••"
                            },
                            first_name: {
                                label: "Vorname",
                                placeholder: "Max"
                            },
                            last_name: {
                                label: "Nachname",
                                placeholder: "Mustermann"
                            },
                            username: {
                                label: "Benutzername",
                                placeholder: "benutzer123"
                            },
                            user: {
                                label: "Benutzer"
                            },
                            entry_name: {
                                label: "Name des Gesetzes",
                                placeholder: "Bundesausbildungsförderungsgesetz"
                            },
                            entry_key: {
                                label: "Kurzform",
                                placeholder: "BAFöG"
                            },
                            section_index: {
                                label: "Nummer",
                                placeholder: "2",
                                prefix: "§"
                            },
                            section_name: {
                                label: "Name",
                                placeholder: "Kranken- und Pflegeversicherungszuschläge"
                            },
                            section_content: {
                                label: "Inhalt"
                            }
                        },
                        dialog: {
                            invitation: {
                                title: "Einladung in \"{{name}}\"",
                                decline_button_label: "Ablehnen",
                                accept_button_label: "Annehmen",
                                role_info: "Wenn du die Einladung annimmst, wirst du die Rolle <1>\"{{role}}\"</1> erhalten.",
                                expiration_info: "Diese Einladung wird am <1>{{date, DATE_FULL}} um {{time, TIME_SIMPLE}}</1> ablaufen.",
                                base_info: "<1>{{author}}</1> hat dich dazu eingeladen, dem Gesetzesbuch <1>\"{{book}}\"</1> beizutreten:"
                            },
                            delete_confirmation: {
                                title: "Löschen von {{type}} bestätigen",
                                description: "Du bist dabei, <1>{{identifier}}</1> zu löschen. Diese Aktion ist permanent und kann nicht rüchgängig gemacht werden!",
                                confirm_button_label: "Löschen bestätigen"
                            }
                        }
                    },
                    validation: {
                        format: {
                            email: "Bitte gebe eine Email Addresse ein",
                            password: "Ein Passwort muss mindestends acht Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen beinhalten.",
                            profile_name: "Ein Name kann nur Buchstaben oder Leerzeichen beinhalten",
                            date_past: "Bitte wähle ein Datum in der Vergangenheit",
                            date_future: "Bitte wähle ein Datum in der Zukunft",
                            username: "Ein Benutzername muss zwischen 4 und 20 Zeichen lang sein, und darf nur Buchstaben, Zahlen und Unterstriche beinhalten.",
                            non_empty: {
                                generic: "Bitte gebe einen Wert ein",
                                gender: "Bitte wähle ein Geschlecht",
                                user: "Bitte wähle einen Benutzer"
                            }
                        },
                        context: {
                            user: {
                                invitation_present: "Dieser Benutzer hat bereits eine ausstehende Einladung in dieses Buch!"
                            },
                            auth: {
                                bad_credentials: "Ungültige Zugangsdaten",
                                invalid_token: "Das Einmalpassword ist ungültig oder abgelaufen.",
                                email_taken: "Email ist bereits registriert.",
                                username_taken: "Benutzername ist bereits in Verwendung."
                            },
                            entry: {
                                key_not_unique: "Ein Gesetz mit der selben Kurzform existiert bereits in diesem Gesetzesbuch!"
                            },
                            section: {
                                index_not_unique: "Ein Paragraph mit derselben Prargraphenzahl existiert bereist in diesem Gesetz!!"
                            },
                            members: {
                                only_one_admin: "Mindestens ein Administrator ist pro Buch erforderlich!"
                            }
                        }
                    },
                    roles: {
                        admin: "Administrator",
                        moderator: "Moderator",
                        member: "Mitglied"
                    }
                }
            }
        }
    })

i18next.services.formatter!.add('DATETIME_SHORT', (value, lng) => {
    return DateTime.fromJSDate(value).setLocale(lng ?? '').toLocaleString(DateTime.DATETIME_SHORT)
});

i18next.services.formatter!.add('DATE_FULL', (value, lng) => {
    return DateTime.fromJSDate(value).setLocale(lng ?? '').toLocaleString(DateTime.DATE_FULL)
});

i18next.services.formatter!.add('TIME_SIMPLE', (value, lng) => {
    return DateTime.fromJSDate(value).setLocale(lng ?? '').toLocaleString(DateTime.TIME_SIMPLE)
});

export default i18next