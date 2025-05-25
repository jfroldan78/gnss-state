import { BehaviorSubject } from 'rxjs';
import { StateObjType } from 'src/types/state-obj.type';
import * as i0 from "@angular/core";
export declare class StateService {
    /**
     * A Directory of objects that can be used to 'reset' a modified object to its
     * original value. Certain methods such as setSubject() or setGroupSubject()
     * will set the backupObj to that value. Otherwise, update() and
     * updateGroupSubject() will not affect the backups copy. This allows
     * [reset buttons]{@link ResetBtn} or [close dialogue buttons]{@link CloseDialogBtn}
     * to reset any unwanted changes to their original values.
     */
    backups: Record<string, StateObjType>;
    /**
     * A Directory of Behavior Subjects that can be subscribed to by any component
     * on the site. A Directory is a specific term for this framework where
     * instead of using an array of objects, we use an object where the top-level
     * keys are the name of the object, and the value is the object itself.
     */
    dir: Record<string, BehaviorSubject<StateObjType>>;
    groupList: BehaviorSubject<string[]>;
    groupBackups: Record<string, Record<string, StateObjType>>;
    groups: Record<string, Record<string, BehaviorSubject<StateObjType>>>;
    updated: BehaviorSubject<string | undefined>;
    /**
     * A method that returns the subject values of all of the current 'dir' object.
     * These values are returned in a 'Directory' format where the primary keys of
     * the Directory object are the names of each object, and the value is the
     * object itself.
     *
     * @param {string} [groupName] The name of the group that contains all of the objects that will be returned.
     * @returns A directory of all of the Behavior Subject values contained in the Directory Service's 'dir' object.
     */
    getDirValues(groupName?: string | null): Record<string, StateObjType>;
    /**
     * Checks to see if a BehaviorSubject with the name 'subjectName' exists in
     * the directory. If the 'gorupName' parameter is provided, the method checks
     * to see if a group with that name exists and if so, if it has a
     * BehaviorSubject with the name equal to the value of the 'subjectName'
     * parameter. If any of the checks pass, the method returns true, otherwise it
     * returns false.
     *
     * @param {string} [subjectName] The name of a BehaviorSubject that the method will use to check if it exists in the directory or a nested group if the 'groupName' parameter is provided.
     * @param {string} [groupName] The name of a group of nested BehaviorSubjects in the directory that is being checked.
     * @returns A boolean value, true if the subject exists in the directory or within a group, false otherwise.
     */
    has(subjectName: string, groupName?: string | null): boolean;
    /**
     * Creates a new BehaviorSubject with the name given in the 'subjectName'
     * parameter with a starting value of undefined. If the BehaviorSubject with
     * that name already exists it will update that value to undefined. If the
     * 'groupName' parameter is provided, the method will create or reset a
     * BehaviorSubject nested in that group, or even create the group if it also
     * doesn't exist. The corresponding object in backups will be created or
     * reset to a value of undefined, and if it's a new BehaviorSubject, its name
     * will be added to the directory's 'list'.
     * @param subjectName
     * @param groupName
     */
    initiate(subjectName: string, groupName?: string | null): void;
    /**
     * Creates a 'group' inside of the Directory Service's 'dir' object. While the
     * group itself will not be a Behavior Subject, any nested object within it will
     * be a Behavior Subject. At the moment the only Directory Service that has
     * nested groups is the [User Interface Directory]{@link UiDirectory}, and it
     * consists of groups such as buttons, cards, and containers. This method will
     * however create a 'group' in any directory.
     * @param groupName The name of the group.
     * @param keyName An optional argument that will create a nested key within the groupName.
     * @param objArray An optional argument that is an array of objects that will be set as Behavior Subjects within the Directory Service's 'dir' object under the group name that was specified by the keyName parameter.
     */
    loadGroup(groupName: string, keyName?: string | null, objArray?: unknown[] | null): void;
    /**
     * Returns a BehaviorSubject that the calling method can subscribe to. If the
     * BehaviorSubject is nested within a directory group, the second parameter
     * should be the name of the group the method is stored in. If the group
     * and/or the BehaviorSubject don't exist, the method will initiate one or
     * both but the BehaviorSubject in this instance will have a default value of
     * undefined. This will allow the calling method to subscribe to a directory
     * object that does not yet exists but whose value will be set or updated by
     * another method.
     *
     * @param {string} [subjectName] The name of a BehaviorSubject that exists in the director.
     * @param {string} [groupName] The name of a group that the BehaviorSubject is nested in. Defaults to null, which means the BehaviorSubject is not nested in a group.
     * @returns {BehaviorSubject} A BehaviorSubject that the calling method can subscribe to.
     */
    observe(subjectName: string, groupName?: string | null): BehaviorSubject<StateObjType>;
    /**
     * Removes an entire group within the Directory Service's [dir]{@link DirectoryModel#dir}
     * object and any [BehaviorSubject]{@link https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject}
     * that are nested within it.
     * @param groupName The name of the group to be removed.
     */
    removeGroup(groupName: string): void;
    /**
     * A method that is typically called by a [Reset Button]{@link ResetBtn} or
     * the closing of a [Dialog]{@link DialogModel} without [saving]{@link SaveBtn}.
     * @param subjectName The name of the Behavior Subject that is to be reset by the method.
     */
    reset(subjectName: string, groupName?: string | null): void;
    /**
     * Sets a new BehaviorSubject in the directory and the backup object. If the
     * BehaviorSubject already exists, it sets a deep clone to the backup object
     * to the value provided in the initialValue parameter. If the groupName
     * parameter is provided, both the BehaviorSubject and the backup are nested
     * in a group with the same name as the groupName value.
     *
     * @param subjectName The name of the subject that will be added to the directory as a BehaviorSubject.
     * @param initialValue The initial value that the BehaviorSubject will have. This will also be added or set to the backups object.
     * @param groupName The name of a group that the BehaviorSubject will be nested in.
     */
    set(subjectName: string, initialValue: StateObjType, groupName?: string | null): void;
    /**
     * Returns a deep clone of the value of a BehaviorSubject.
     *
     * @param subjectName The name of the BehaviorSubject.
     * @param groupName The name of a group. Defaults to null.
     * @returns The value of a BehaviorSubject or null if it and/or the group doesn't exist.
     */
    value(subjectName: string, groupName?: string | null): any;
    /**
     * Updates the value of a behavior subject with the name specified in 'subjectName'
     * with the value specified in 'newValue'. If the event doesn't exist as a
     * nested behavior subject in the 'dir' object, the method will call the
     * createSubject method and pass on the two parameters as arguments.
     *
     * @param {string} subjectName - The name of the event to be updated.
     * @param {string|boolean|number} newValue - The new value to be passed to the Behavior Subject's next method.
     * @param {string} groupName - The name of the group an object is stored in.
     */
    update(subjectName: string, newValue: StateObjType, groupName?: string | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StateService>;
}
