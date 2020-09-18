/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/11 20:19:25 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 17:09:27 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

int main()
{
	t_node **head = malloc(sizeof(t_node *));

	*head = 0;
	// *** add nodes ***  //
	add_node(head, 1);		//1
	add_node_n(head, 1, 2);	//21
	add_node_n(head, 2, 3);	//213
	add_node_n(head, 1, 4);	//4213
	add_node_n(head, 4, 5);	//42135
	// *** add nodes ***  //

	// *** print nodes *** ///
	print_node(head);
	// *** print nodes *** ///
	
	
	// *** delete nodes *** ///
	delete_node(head, 1);	//2135
	// *** delete nodes *** ///
	
	// *** find node *** ///
	t_node *find;
	find = find_node(head, 3); // find node with '3' data
	printf("data = %d\n",find->data); // 3
	print_node(head);
	// *** find node *** ///
	
	// *** edit nodes *** ///
	edit_all_node(head, 3, 18); // 2 1 18 5
	// *** edit nodes *** ///
	print_node(head);
	add_node(head, 5);		//2 1 18 5 5
	add_node(head, 5);		//2 1 18 5 5 5
	edit_all_node(head, 5, 8);
	print_node(head);		//2 1 18 8 8 8
	printf("list size is = %d\n",node_size(head));
	reverse(head);
	print_node(head);
}
